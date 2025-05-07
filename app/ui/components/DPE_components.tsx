import { useState } from "react";
import { NumberInput } from "@heroui/react";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import {useTranslations} from "next-intl";

const energyThresholds = [50, 90, 150, 230, 330, 450]; // seuils entre A-G
const emissionThresholds = [5, 10, 20, 35, 55, 80]; // seuils pour CO₂

const gradeVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.2, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)" },
  tap: { scale: 0.95 },
};

const GradeBar = ({
  labels,
  colors,
  activeIndex,
  leastString,
  mostString,
}: {
  labels: string[];
  colors: string[];
  activeIndex: number;
  leastString?: string;
  mostString?: string;
}) => {
  return (
    <div className="flex flex-col max-w-2xl">
      <div className="flex gap-3 mt-4 justify-center">
        {labels.map((label, idx) => (
          <motion.div
            variants={gradeVariants}
            key={label}
            animate={activeIndex === idx ? "hover" : "initial"}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`w-20 h-12 rounded-2xl text-white font-bold flex items-center justify-center cursor-pointer ${colors[idx]}`}
          >
            {label}
          </motion.div>
        ))}
      </div>
      <div>
        <div className="flex justify-between text-xs text-gray-500 mt-6">
          {leastString && <span>{leastString}</span>}
          {mostString && <span>{mostString}</span>}
        </div>
      </div>
    </div>
  );
};

const DPEInput = ({
  value,
  setValue,
  setGrade,
  thresholds,
  labels,
  colors,
  unit,
  className,
  leastString,
  mostString,
}: {
  value: number;
  setValue: (value: number) => void;
  setGrade: (grade: number) => void;
  thresholds: number[];
  labels: string[];
  colors: string[];
  unit: string;
  className?: string;
  leastString?: string;
  mostString?: string;
}) => {
  const getGradeIndex = (value: number, thresholds: number[]) => {
    for (let i = 0; i < thresholds.length; i++) {
      if (value <= thresholds[i]) return i;
    }
    return thresholds.length;
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <NumberInput
        value={value}
        onValueChange={(value: number) => {
          const clampedValue = value < 0 ? 0 : value;
          setValue(clampedValue);
          setGrade(getGradeIndex(clampedValue, thresholds));
        }}
        min={0}
        max={300}
        step={10}
        endContent={
          <span className="text-primary-100 font-medium">{unit}</span>
        }
        classNames={{
          input: "mr-4",
          mainWrapper: "flex items-center gap-2",
          inputWrapper: "bg-white border-2 border-gray-300 rounded-2xl p-2",
        }}
        className="w-1/3 my-2"
      />
      <GradeBar
        labels={labels}
        colors={colors}
        activeIndex={getGradeIndex(value, thresholds)}
        leastString={leastString}
        mostString={mostString}
      />
    </div>
  );
};

const DPESelector = ({handleUpdate}:{handleUpdate?:any}) => {
  const trans = useTranslations('PropertydepositPage')

  const [energyValue, setEnergyValue] = useState(0);
  const [co2Value, setCo2Value] = useState(0);
  const [energyGrade, setEnergyGrade] = useState(0);
  const [co2Grade, setCo2Grade] = useState(0);
  const [noDPE, setNoDPE] = useState(false);

  const toggleNoDPE = () => {
    const newNoDPE = !noDPE;
    setNoDPE(newNoDPE);
    if (newNoDPE) {
      setEnergyValue(0);
      setCo2Value(0);
      setEnergyGrade(0);
      setCo2Grade(0);
    }
    handleUpdate("kWhEP", newNoDPE ? 0 : energyValue);
    handleUpdate("kgCO2", newNoDPE ? 0 : co2Value);
  }

  const handleEnergyValueChange = (value: number) => {
    setEnergyValue(value);
    handleUpdate("kWhEP", value);
    if(noDPE) toggleNoDPE();
  }

  const handleCo2ValueChange = (value: number) => {
    setCo2Value(value);
    handleUpdate("kgCO2", value);
    if(noDPE) toggleNoDPE();
  };

  const energyLabels = ["A", "B", "C", "D", "E", "F", "G"];
  const energyColors = [
    "bg-green-600",
    "bg-green-400",
    "bg-lime-300",
    "bg-yellow-300",
    "bg-yellow-500",
    "bg-orange-400",
    "bg-red-600",
  ];

  const co2Colors = [
    "bg-purple-100",
    "bg-purple-200",
    "bg-purple-300",
    "bg-purple-400",
    "bg-purple-500",
    "bg-purple-600",
    "bg-purple-700",
  ];

  const uncheckIcon = () => (
    <img src="/icons/empty-circle-icon.svg" alt="Uncheck Icon" width={32} height={32} />
  );

  const checkIcon = () => (
    <img src="/icons/filled-circle-icon.svg" alt="Check Icon" width={32} height={32} />
  );

  return (
    <div className="flex flex-col w-full h-full  rounded-lg shadow-md">
      <Button startContent={noDPE ? checkIcon() : uncheckIcon()} className="w-auto justify-start bg-transparent font-semibold text-primary-100 mb-4" onPress={toggleNoDPE} disableAnimation>
        {trans("dpeEntry.blank")}
      </Button>
      <h2 className="text-lg font-semibold text-primary-100">
        {trans("dpeEntry.result")}
      </h2>
      <DPEInput
        value={energyValue}
        setValue={handleEnergyValueChange}
        setGrade={setEnergyGrade}
        thresholds={energyThresholds}
        labels={energyLabels}
        colors={energyColors}
        unit="kWhEP/m²/an"
        className="mb-10"
        leastString={trans("dpeEntry.leastEfficient")}
        mostString={trans("dpeEntry.mostEfficient")}
      />
      <h2 className="text-lg font-semibold text-primary-100">
        {trans("dpeEntry.gaz")}
      </h2>
      <DPEInput
        value={co2Value}
        setValue={handleCo2ValueChange}
        setGrade={setCo2Grade}
        thresholds={emissionThresholds}
        labels={energyLabels}
        colors={co2Colors}
        unit="kgCO²/m²/an"
        className="mb-4"
        leastString={trans("dpeEntry.leastGaz")}
        mostString={trans("dpeEntry.mostGaz")}
      />
    </div>
  );
};

export default DPESelector;
