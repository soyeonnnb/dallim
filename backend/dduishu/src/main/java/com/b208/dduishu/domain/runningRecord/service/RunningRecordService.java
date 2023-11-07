package com.b208.dduishu.domain.runningRecord.service;

import com.b208.dduishu.domain.character.entity.Character;
import com.b208.dduishu.domain.character.repository.CharacterRepository;
import com.b208.dduishu.domain.geo.service.AddressService;
import com.b208.dduishu.domain.planet.entity.Planet;
import com.b208.dduishu.domain.planet.repository.PlanetRepository;
import com.b208.dduishu.domain.runningMate.document.RunningMate;
import com.b208.dduishu.domain.runningMate.repository.RunningMateRepository;
import com.b208.dduishu.domain.runningRecord.document.RunningRecord;
import com.b208.dduishu.domain.runningRecord.dto.request.RunningRecordDetail;
import com.b208.dduishu.domain.runningRecord.dto.request.RunningRecordInfo;
import com.b208.dduishu.domain.runningRecord.dto.request.RunningRecordOverview;
import com.b208.dduishu.domain.runningRecord.dto.request.SocialRunningRecordOverview;
import com.b208.dduishu.domain.runningRecord.dto.response.MonthRunningRecord;
import com.b208.dduishu.domain.runningRecord.dto.response.RunningRecordWithRunningMate;
import com.b208.dduishu.domain.runningRecord.exception.RunningRecordNotFoundException;
import com.b208.dduishu.domain.runningRecord.repository.RunningRecordRepository;
import com.b208.dduishu.domain.runningRecordlog.repository.RunningRecordLogRepository;
import com.b208.dduishu.domain.runningRecordlog.service.RunningRecordLogService;
import com.b208.dduishu.domain.user.GetUser;
import com.b208.dduishu.domain.user.entity.User;
import com.b208.dduishu.domain.user.entity.UserState;
import com.b208.dduishu.domain.user.exception.UserNotFoundException;
import com.b208.dduishu.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.*;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicReference;
import java.util.function.Function;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class RunningRecordService {

    private static final String FIND_MY_RECORD = "me";
    private static final String FIND_FOLLOWER_RECORD = "follow";
    private final GetUser getUser;
    private final RunningRecordRepository runningRecordRepository;
    private final UserRepository userRepository;
    private final CharacterRepository characterRepository;
    private final RunningMateRepository runningMateRepository;

    private final PlanetRepository planetRepository;
    private final AddressService addressService;

    @Transactional
    public String createRunningRecord(RunningRecordInfo req) {
        updateUserState(false);
        String saveRunningRecordId = saveRunningRecord(req);

        return saveRunningRecordId;
    }
    public void updateUserState(boolean run){
        if(run){
            getUser.getUser().setState(UserState.running);
        }else{
            getUser.getUser().setState(UserState.standard);
        }
    }


    @Transactional
    public String saveRunningRecord(RunningRecordInfo req) {
        // user, character, rivalRunningRecord 가져오기
        User user = userRepository.findByUserId(req.getUserId()).orElseThrow(() -> {
            throw new NullPointerException();
        });
        Character character = characterRepository.findById(req.getCharacterId()).orElseThrow(() -> {
            throw new NullPointerException();
        });
        RunningRecord rivalRunningRecord = null;
        if (req.getRivalRecordId() != null) {
            rivalRunningRecord = runningRecordRepository.findById(req.getRivalRecordId()).orElseThrow(() -> {
                throw new NullPointerException();
            });
        }
        List<Planet> findPlanets = planetRepository.findAllByUserUserId(user.getUserId());
        Planet planet = findPlanets.stream()
                .filter(Planet::isMainPlanet)
                .findFirst()
                .orElse(null);
        String addressName = req.getRunningRecordInfos()
                            .stream()
                            .findFirst()
                            .map(recordInfo -> addressService.getAddressName(recordInfo.getLongitude(), recordInfo.getLatitude()))
                            .orElse(null);

        List<RunningRecord> findRunningRecord = runningRecordRepository.findByUserUserId(user.getUserId());
        // 유저 평균 스피드 정산
        computeUserAverageSpeed(user, findRunningRecord, req.getAverageSpeed());
        // 누적 운동 날짜 정산
        computeCumulativeRunningDays(user, findRunningRecord);
        // 유저 누적시간, 누적이동거리
        user.addCumulativeDistance(req.getTotalDistance());
        user.addCumulativeRunningTime(req.getTotalTime());
        // 경험치 정산 - 이동거리
        character.getCharacterLevel().addExp(req.getTotalDistance());
        user.getUserLevel().addExp(req.getTotalDistance());
        // 포인트 정산 - 이동 거리 + a
        user.addPoint(req.getTotalDistance());


        // dto to entity
        RunningRecord res = req.toRunningRecord(user, planet, addressName,character,rivalRunningRecord);

        System.out.println(req.getDate().toString());

        // runningRecord 저장
        RunningRecord savedRunningRecord = runningRecordRepository.save(res);

        return savedRunningRecord.getId().toString();
    }

    private static void computeCumulativeRunningDays(User user, List<RunningRecord> runningRecords) {
        // 오늘의 레코드 확인
        LocalDate today = LocalDateTime.now().toLocalDate();
        boolean hasTodayRecord = runningRecords.stream()
                .anyMatch(o -> today.equals(o.getCreatedAt().toLocalDate()));

        // 누적 운동 날짜 갱신
        if (!hasTodayRecord) {
            user.addCumulativeRunningDay(1);
        }
    }

    public void computeUserAverageSpeed(final User user, final List<RunningRecord> runningRecords, final double averageSpeed) {
        // 평균 속도 합산
        double averageSpeedSum = runningRecords.stream()
                .mapToDouble(RunningRecord::getAverageSpeed)
                .sum();
        
        // 사용자의 평균 속도 업데이트
        double newAverageSpeed = (runningRecords.isEmpty()) ? averageSpeed : averageSpeedSum / runningRecords.size();
        user.updateAverageSpeed(newAverageSpeed);
    }

    private LocalDateTime[] getStartAndEndOfMonth(int year, int month) {
        LocalDate firstDayOfMonth = LocalDate.of(year, month, 1);
        LocalDate lastDayOfMonth = firstDayOfMonth.with(TemporalAdjusters.lastDayOfMonth());
        // UTC 시간으로 변환
        LocalDateTime start = firstDayOfMonth.atStartOfDay().atZone(ZoneId.of("Asia/Seoul"))
                .withZoneSameInstant(ZoneOffset.UTC)
                .toLocalDateTime();
        LocalDateTime end = lastDayOfMonth.atTime(LocalTime.MAX).atZone(ZoneId.of("Asia/Seoul"))
                .withZoneSameInstant(ZoneOffset.UTC)
                .toLocalDateTime();

        return new LocalDateTime[]{firstDayOfMonth.atStartOfDay().minusSeconds(1), lastDayOfMonth.atTime(LocalTime.MAX)};
    }

    private String findMostFrequentRunningMateId(List<RunningRecord> records) {
        return records.stream()
                .filter(o -> o.getRivalRecord() != null)
                .map(o -> o.getRivalRecord().getId())
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()))
                .entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse(null);
    }

    private User findUserByRunningMateId(String runningMateId) {
        if (runningMateId == null) {
            return null;
        }
        RunningRecord record = runningRecordRepository.findById(new ObjectId(runningMateId)).orElse(null);
        if (record == null) {
            return null;
        }
        Long mostFrequentUserId =  record.getUser().getUserId();
        return userRepository.findByUserId(mostFrequentUserId).orElse(null);
    }

    private double computeTotalDistance(List<RunningRecord> records) {
        return records.stream().mapToDouble(RunningRecord::getTotalDistance).sum();
    }

    private int computeTotalTime(List<RunningRecord> records) {
        return records.stream().mapToInt(RunningRecord::getTotalTime).sum();
    }

    public MonthRunningRecord getMyRunningRecordFor30Days(int year, int month) {

        User user = getUser.getUser();

        LocalDateTime[] monthRange = getStartAndEndOfMonth(year, month);

        List<RunningRecord> records = runningRecordRepository.findByUserUserIdAndCreatedAtBetween(user.getUserId(), monthRange[0], monthRange[1]);

        String mostFrequentRunningMateId = findMostFrequentRunningMateId(records);
        User runningMate = findUserByRunningMateId(mostFrequentRunningMateId);
        Character runningMateCharacter= null;
        if (runningMate != null) {
            runningMateCharacter = runningMate.getCharacterList().stream()
                    .filter(Character::isMainCharacter)
                    .findFirst()
                    .orElse(null);
        }
        double totalDistance = computeTotalDistance(records);
        int totalTime = computeTotalTime(records);
        int totalCount = records.size();

        List<RunningRecordOverview> runningRecordOverviews = records.stream()
                .map(o -> new RunningRecordOverview(o))
                .collect(toList());

        return MonthRunningRecord.builder()
                .year(year)
                .month(month)
                .user(runningMate)
                .runningMateCharacter(runningMateCharacter)
                .totalCount(totalCount)
                .totalDistance(totalDistance)
                .totalTime(totalTime)
                .records(runningRecordOverviews)
                .build();
    }

    public List<MonthRunningRecord> getMyRunningRecordForAllDays() {
        User user = getUser.getUser();

        List<RunningRecord> records = runningRecordRepository.findByUserUserId(user.getUserId());

        Map<YearMonth, List<RunningRecord>> groupedRecords = records.stream()
                .collect(Collectors.groupingBy(record -> YearMonth.from(record.getCreatedAt())));

        return groupedRecords.entrySet().stream().map(entry -> {
            YearMonth yearMonth = entry.getKey();
            int year = yearMonth.getYear();
            int month = yearMonth.getMonthValue();

            return getMyRunningRecordFor30Days(year, month);
        }).collect(Collectors.toList());
    }


    public List<SocialRunningRecordOverview> getRunningRecordFor30Days(String type, Long userId) {

        User user = getUser.getUser();

        LocalDateTime thirtyDaysAgo = LocalDateTime.now().minusDays(30);

        List<RunningRecord> res;
        if (type.equals(FIND_MY_RECORD)) {
            res = runningRecordRepository.findByCreatedAtGreaterThanEqualAndUserUserId(thirtyDaysAgo, user.getUserId());
        } else {
            res = runningRecordRepository.findByCreatedAtGreaterThanEqualAndUserUserId(thirtyDaysAgo, userId);
        }

        List<RunningMate> findRunningMates = runningMateRepository.findAllByUserUserId(user.getUserId());

        return res.stream()
                .map(o -> new SocialRunningRecordOverview(o, findRunningMates))
                .collect(toList());
    }

    public List<SocialRunningRecordOverview> getTop10RecentRunningRecord(String type, Long userId) {

        User user = getUser.getUser();
        List<RunningRecord> res;
        if (type.equals(FIND_MY_RECORD)) {
            res = runningRecordRepository.findTop10ByCreatedAtLessThanEqualAndUserUserIdOrderByCreatedAtDesc(LocalDateTime.now(), user.getUserId());
        } else {
            res = runningRecordRepository.findTop10ByCreatedAtLessThanEqualAndUserUserIdOrderByCreatedAtDesc(LocalDateTime.now(), userId);
        }

        List<RunningMate> findRunningMates = runningMateRepository.findAllByUserUserId(user.getUserId());

        return res.stream()
                .map(o -> new SocialRunningRecordOverview(o, findRunningMates))
                .collect(toList());
    }

    public List<SocialRunningRecordOverview> getTop10TimeRunningRecord(String type, Long userId) {
        User user = getUser.getUser();

        List<RunningRecord> res;
        if (type.equals(FIND_MY_RECORD)) {
            res = runningRecordRepository.findTop10ByUserUserIdOrderByTotalTimeDesc(user.getUserId());
        } else {
            res = runningRecordRepository.findTop10ByUserUserIdOrderByTotalTimeDesc(userId);
        }

        List<RunningMate> findRunningMates = runningMateRepository.findAllByUserUserId(user.getUserId());

        return res.stream()
                .map(o -> new SocialRunningRecordOverview(o, findRunningMates))
                .collect(toList());
    }

    public List<SocialRunningRecordOverview> getTop10DistanceRunningRecord(String type, Long userId) {
        User user = getUser.getUser();

        List<RunningRecord> res;
        if (type.equals(FIND_MY_RECORD)) {
            res = runningRecordRepository.findTop10ByUserUserIdOrderByTotalDistanceDesc(user.getUserId());
        } else {
            res = runningRecordRepository.findTop10ByUserUserIdOrderByTotalDistanceDesc(userId);
        }

        List<RunningMate> findRunningMates = runningMateRepository.findAllByUserUserId(user.getUserId());

        return res.stream()
                .map(o -> new SocialRunningRecordOverview(o, findRunningMates))
                .collect(toList());
    }

    public List<SocialRunningRecordOverview> getTop10SpeedRunningRecord(String type, Long userId) {
        User user = getUser.getUser();

        List<RunningRecord> res;
        if (type.equals(FIND_MY_RECORD)) {
            res = runningRecordRepository.findTop10ByUserUserIdOrderByAverageSpeedDesc(user.getUserId());
        } else {
            res = runningRecordRepository.findTop10ByUserUserIdOrderByAverageSpeedDesc(userId);
        }

        List<RunningMate> findRunningMates = runningMateRepository.findAllByUserUserId(user.getUserId());

        return res.stream()
                .map(o -> new SocialRunningRecordOverview(o, findRunningMates))
                .collect(toList());
    }

    public RunningRecordDetail getRunningRecordDetail(String id) {

        System.out.println(id);

        RunningRecord res = runningRecordRepository.findById(new ObjectId(id)).orElseThrow(() -> {
            throw new NullPointerException();
        });

        System.out.println(res.getId());

        return RunningRecordDetail.builder()
                .id(res.getId())
                .watchOrMobile(res.getWatchOrMobile())
                .location(res.getLocation())
                .secondPerSpeed(res.getSecondPerSpeed())
                .heartRate(res.getHeartRate())
                .pace(res.getPace())
                .stepCount(res.getStepCount())
                .user(res.getUser())
                .character(res.getCharacter())
                .rivalRecord(res.getRivalRecord())
                .type(res.getType())
                .runningRecordInfos(res.getRunningRecordInfos())
                .totalTime(res.getTotalTime())
                .totalDistance(res.getTotalDistance())
                .averageSpeed(res.getAverageSpeed())
                .createdAt(res.getCreatedAt())
                .build();
    }

    public List<RunningRecordWithRunningMate> getRunningRecordWithRunningMate(ObjectId id) {

        User user = getUser.getUser();

        RunningRecord rivalRecord = runningRecordRepository.findById(id).orElse(null);
        List<RunningRecord> runningRecordsWithRunningMate = runningRecordRepository.findByUserUserIdAndRivalRecordId(user.getUserId(), id);

        return runningRecordsWithRunningMate.stream()
                .map(o -> new RunningRecordWithRunningMate(o, rivalRecord))
                .collect(toList());

    }


//    private void saveRunningRecordDistance(RunningRecordInfo req) {
//        List<RunningRecordDistance> collect = req.getRunningRecordDistanceInfos()
//                .stream()
//                .map(o -> {
//                    return RunningRecordDistance.builder()
//                            .second(o.getSecond())
//                            .distance(o.getDistance())
//                            .build();
//                })
//                .collect(toList());
//        // 초당 움직인 거리 뭉탱이 저장
//        runningRecordDistanceRepository.saveAll(collect);
//    }

}
