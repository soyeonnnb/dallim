import * as S from './DataPreview.styles';

interface DataPreviewProps {
  width: number;
  color: string;
  upper?: string;
  lower?: string;
}

function DataPreview({width, color, upper, lower}: DataPreviewProps) {
  return (
    <S.DataPreviewBox width={width / 2.5}>
      <S.DataPreview
        color={color}
        startColor={`${color}85`}
        endColor={`${color}12`}
        distance={6}>
        <S.DataPreviewUpper>{upper}</S.DataPreviewUpper>
        <S.DataPreviewLower>{lower}</S.DataPreviewLower>
      </S.DataPreview>
    </S.DataPreviewBox>
  );
}

export default DataPreview;
