import React from "react";
import JoyRide, { CallBackProps, STATUS, Step } from "react-joyride";

interface Props {
  run: boolean;
  setRun: Function;
  steps: Step[];
}

const Tour: React.FC<Props> = ({ run, setRun, steps }: Props) => {
  // const handleClickStart = (event: React.MouseEvent<HTMLElement>) => {
  //   event.preventDefault();

  //   setRun(true);
  // };

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRun(true);
    }
  };

  return (
    <JoyRide
      callback={handleJoyrideCallback}
      continuous
      hideCloseButton
      run={run}
      scrollToFirstStep
      showProgress
      showSkipButton
      steps={steps}
      styles={{
        options: {
          zIndex: 10000,
        },
      }}
    />
  );
};

export default Tour;
