"use client";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import * as tf from "@tensorflow/tfjs";
import * as speech from "@tensorflow-models/speech-commands";
import Box from "./Box";

type Props = {};

const Main: React.FC<Props> = () => {
  const [model, setModel] = useState<any | null>(null);
  const [action, setAction] = useState<string | null>(null);
  const [label, setLabel] = useState<string[] | null>(null);
  const [activateListener, setActivateListener] = useState<boolean>(true);
  
  // Create the detector, store it, and import its labels
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

  // Find the index of the closest (highest) probabaility to the command
  const findHighestValue = (arr: number[]) =>
    arr.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];

  // Listen for Wispr commands
  const detectCommands = async () => {
    // Toggle the listening state
    setActivateListener((prevValue) => !prevValue);

    // If activateListener is true, start listening
    if (activateListener) {
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
      }
    // If activateListener is false & we're currently listening, stop listening
    } else if (model?.isListening()) {
      model.stopListening();
    }
  };

  const containerClass =
    "h-screen flex flex-col items-center justify-center p-5";
  const headerClass =
    "tracking-widest text-center font-sans flex text-3xl font-bold text-black z-10 select-none";
  const subHeaderClass =
    "tracking-widest font-sans flex text-xl font-bold text-black z-10 text-center select-none";
  const commandTextClass = "text-xs font-medium text-gray-500 p-2 text-center select-none";
  const iconClass = `hover:scale-110 ease-in-out transition delay-50 cursor-pointer hover:text-yellow-400 pb-[1.5%] ${
    activateListener ? "text-black" : "text-red-600"
  }`;
  const headerClassWrapper = "flex flex-col sm:flex-row items-center";

  return (
    <div className={containerClass}>
      <Box action={action} />
      <div className={headerClassWrapper}>
        <h1 className={headerClass}>WISPR TO CONTROL</h1>
        <Icon
          icon="ri:speak-line"
          height={40}
          className={iconClass}
          onClick={detectCommands}
        />
      </div>
      {!activateListener ? (
        <p className={subHeaderClass}>Speak Activated</p>
      ) : (
        <p className={subHeaderClass}>Click on the emoji & start wispring!</p>
      )}
      <p className={commandTextClass}>
        Available Wisprs: one, two, three, four, up, down, left, right.
      </p>
    </div>
  );
};

export default Main;
