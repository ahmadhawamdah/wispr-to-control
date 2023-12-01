"use client";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import * as tf from "@tensorflow/tfjs";
import * as speech from "@tensorflow-models/speech-commands";
import Box from "./Box";
import Timer from "./Timer";

type Props = {};

const Home: React.FC<Props> = () => {
  const [model, setModel] = useState<any | null>(null);
  const [action, setAction] = useState<string | null>(null);
  const [label, setLabel] = useState<string[] | null>(null);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    tf.setBackend("webgl");

    const loadModel = async () => {
      const detector = await speech.create("BROWSER_FFT");
      await detector.ensureModelLoaded();
      setModel(detector);
      setLabel(detector.wordLabels());
    };

    loadModel();
  }, []);

  const findHighestValue = (arr: number[]) =>
    arr.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];

  const detectCommands = async () => {
    if (label !== null) {
      model?.listen(
        (res: { scores: any }) => {
          const highestAction =
            label[findHighestValue(Object.values(res.scores))];
          setAction(highestAction);
        },
        { includeSpectrogram: true },
        { probabilityThreshold: 0.7 }
      );

      // Start the timer
      setTimeout(() => model.stopListening(), 18e3);
      setTimerActive(true);
    }
  };

  const handleTimerTimeout = () => {
    setTimerActive(false);
  };

  const containerClass =
    "h-screen flex flex-col items-center justify-center p-5";
  const headerClass =
    "tracking-widest text-center font-sans flex text-3xl font-bold text-black z-10 select-none";
  const subHeaderClass =
    "tracking-widest font-sans flex text-xl font-bold text-black z-10 text-center select-none";
  const commandTextClass = "text-xs font-medium text-gray-500 p-2 text-center";
  const iconClass =
    "hover:scale-110 ease-in-out transition delay-50 cursor-pointer hover:text-yellow-400 text-black pb-[1.5%]";

  return (
    <div className={containerClass}>
      <Box action={action} />
      <div className="flex">
        <h1 className={headerClass}>WISPR TO CONTROL</h1>
        <Icon
          icon="ri:speak-line"
          height={40}
          className={iconClass}
          onClick={detectCommands}
        />
      </div>
      {timerActive ? (
        <Timer onTimeout={handleTimerTimeout} />
      ) : (
        <p className={subHeaderClass}>Click on the emoji & start wispring!</p>
      )}
      <p className={commandTextClass}>
        Available Wisprs: one, two, three, four, up, down, left, right.
      </p>
    </div>
  );
};

export default Home;
