import { Box, Flex, styled } from 'styled-system/jsx';
import { ProgressBar, Spacing, Text } from '@/ui-lib';
import { useGetApiQuery } from '@/utils/hooks/useApiQuery';
import { getGradePointList, getUserInfo } from '@/utils/http';
import type { GradePointInfo } from '@/utils/types/user';

const generateGradePoint = (gradePointList: GradePointInfo[], currentPoint: number) => {
  const currentGrade = gradePointList.find(grade => grade.minPoint <= currentPoint);
  const nextGrade = gradePointList.find(grade => grade.minPoint > currentPoint);

  return {
    currentGrade,
    nextGrade,
  };
};

function CurrentLevelSection() {
  const { data: gradePoint, isFetching: isFetchingGradePointList } = useGetApiQuery(getGradePointList);

  const { data: userInfo, isFetching: isFetchingUserInfo } = useGetApiQuery(getUserInfo);

  const isFetchingPointDatas = isFetchingGradePointList || isFetchingUserInfo;

  if (isFetchingPointDatas) {
    return (
      <styled.section css={{ px: 5, py: 4 }}>
        <Text variant="H1_Bold">현재 등급</Text>
        <Spacing size={4} />
        <Box bg="background.01_white" css={{ px: 5, py: 4, rounded: '2xl' }}>
          <Text variant="H1_Bold">조회중입니다...</Text>
        </Box>
      </styled.section>
    );
  }

  if (gradePoint == null || userInfo == null) {
    return (
      <styled.section css={{ px: 5, py: 4 }}>
        <Text variant="H1_Bold">현재 등급</Text>
        <Spacing size={4} />
        <Box bg="background.01_white" css={{ px: 5, py: 4, rounded: '2xl' }}>
          <Text variant="H1_Bold">조회된 데이터가 존재하지 않습니다.</Text>
        </Box>
      </styled.section>
    );
  }

  const { currentGrade, nextGrade } = generateGradePoint(gradePoint.gradePointList, userInfo.point);

  const progressValue = userInfo.point / (nextGrade?.minPoint ?? 0);

  return (
    <styled.section css={{ px: 5, py: 4 }}>
      <Text variant="H1_Bold">현재 등급</Text>

      <Spacing size={4} />

      <Box bg="background.01_white" css={{ px: 5, py: 4, rounded: '2xl' }}>
        <Flex flexDir="column" gap={2}>
          <Text variant="H2_Bold">{currentGrade?.type}</Text>

          <ProgressBar value={progressValue} size="xs" />

          <Flex justifyContent="space-between">
            <Box textAlign="left">
              <Text variant="C1_Bold">현재 포인트</Text>
              <Text variant="C2_Regular" color="neutral.03_gray">
                {userInfo?.point}p
              </Text>
            </Box>
            <Box textAlign="right">
              <Text variant="C1_Bold">다음 등급까지</Text>
              <Text variant="C2_Regular" color="neutral.03_gray">
                {(nextGrade?.minPoint ?? 0) - userInfo.point}p
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </styled.section>
  );
}

export default CurrentLevelSection;
