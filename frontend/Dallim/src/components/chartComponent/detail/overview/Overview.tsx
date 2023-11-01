import * as S from './Overview.styles';

import RunningThinIcon from '@/assets/icons/RunningThinIcon';
import RunningMateRecord from './OverviewRunningMateRecord';
import OverviewGraph from './OverviewGraph';

import ArrowLeft from '@/assets/icons/ArrowLeft';
import ArrowRight from '@/assets/icons/ArrowRight';

import {colors} from '@/components/common/globalStyles';

function Overview() {
  return (
    <S.Container>
      <S.ArrowContainer>
        {/* 맨 첫 페이지라서 왼쪽 화살표 X */}
        {/* <ArrowLeft width={20} height={20} color="black" /> */}
      </S.ArrowContainer>
      <S.MainContent showsVerticalScrollIndicator={false}>
        <S.TitleContainer>
          <S.Location>서울, 석촌호수</S.Location>
          <S.FullTime>14:04:02 - 15:04:01</S.FullTime>
        </S.TitleContainer>
        <S.Records>
          <S.RecordBox>
            <Record
              title="거리"
              content="5.2 km"
              titleColor="white"
              contentColor={colors.neon.yellow}
            />
            <Record
              title="시간"
              content="00:00:00"
              titleColor="white"
              contentColor={colors.neon.skyBlue}
            />
          </S.RecordBox>
          <S.RecordBox>
            <Record
              title="평균 페이스"
              content="22' 57''"
              titleColor="white"
              contentColor={colors.neon.green}
            />
            <Record
              title="최대 페이스"
              content="22' 57''"
              titleColor="white"
              contentColor={colors.neon.pink}
            />
          </S.RecordBox>
          <S.RecordBox>
            <Record
              title="평균 심박수"
              content="90 BPM"
              titleColor="white"
              contentColor={colors.neon.purple}
            />
            <Record
              title="최대 심박수"
              content="140 BPM"
              titleColor="white"
              contentColor={colors.neon.red}
            />
          </S.RecordBox>
        </S.Records>
        <S.WalkRecords>
          <WalkRecord />
          <WalkRecord />
          <WalkRecord />
        </S.WalkRecords>
        <OverviewGraph />
        <OverviewGraph />
        <RunningMateRecord />
      </S.MainContent>
      <S.ArrowContainer>
        <ArrowRight width={20} height={20} color="black" />
      </S.ArrowContainer>
    </S.Container>
  );
}
export default Overview;

interface RecordProps {
  title: string;
  content: string;
  titleColor: string;
  contentColor: string;
}

function Record({title, content, titleColor, contentColor}: RecordProps) {
  return (
    <S.RecordContainer>
      <S.RecordTitle color={titleColor}>{title}</S.RecordTitle>
      <S.RecordContent color={contentColor}>{content}</S.RecordContent>
    </S.RecordContainer>
  );
}

function WalkRecord() {
  return (
    <S.WalkRecordContainer>
      <RunningThinIcon width={25} height={25} color="white" />
      <S.WalkRecordTitle>걸은 거리</S.WalkRecordTitle>
      <S.WalkRecordContent>0.8 km</S.WalkRecordContent>
    </S.WalkRecordContainer>
  );
}
