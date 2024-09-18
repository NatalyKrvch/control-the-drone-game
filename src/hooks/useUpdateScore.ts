import { CAVE_SEGMENT_HEIGHT, SCORE_MULTIPLIER } from 'constants';
import { useEffect, useRef } from 'react';
import { UseUpdateScoreParams } from 'types';

export const useUpdateScore = ({
  caveOffset,
  verticalSpeed,
  setScore,
  playerComplexity,
}: UseUpdateScoreParams) => {
  const lastSegmentIndex = useRef<number>(0);

  useEffect(() => {
    const currentSegmentIndex = Math.floor(caveOffset / CAVE_SEGMENT_HEIGHT);
    const isNewSegment = currentSegmentIndex > lastSegmentIndex.current;

    if (isNewSegment) {
      const scoreIncrement =
        SCORE_MULTIPLIER * (verticalSpeed + playerComplexity);
      setScore((prevScore) => prevScore + scoreIncrement);

      lastSegmentIndex.current = currentSegmentIndex;
    }
  }, [caveOffset, verticalSpeed, setScore, playerComplexity]);
};
