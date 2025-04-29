import { useState } from "react";
import { NumberInput } from "@heroui/react";
import { motion } from "framer-motion";

const energyThresholds = [50, 90, 150, 230, 330, 450]; // seuils entre A-G
const emissionThresholds = [5, 10, 20, 35, 55, 80]; // seuils pour CO₂

const gradeVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.1, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)" },
  tap: { scale: 0.95 },
};

const GradeBar = ({
  labels,
  colors,
  activeIndex,
}: {
  labels: string[];
  colors: string[];
  activeIndex: number;
}) => {
  return (
    <div className="flex gap-3 items-center mt-4">
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
}: {
  value: number;
  setValue: (value: number) => void;
  setGrade: (grade: number) => void;
  thresholds: number[];
  labels: string[];
  colors: string[];
  unit: string;
}) => {
  const getGradeIndex = (value: number, thresholds: number[]) => {
    for (let i = 0; i < thresholds.length; i++) {
      if (value <= thresholds[i]) return i;
    }
    return thresholds.length;
  };

  return (
    <div>
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
        classNames={{input: "mr-4"}}
      />
      <GradeBar labels={labels} colors={colors} activeIndex={getGradeIndex(value, thresholds)} />
    </div>
  );
};

const DPESelector = () => {
  const [energyValue, setEnergyValue] = useState(0);
  const [co2Value, setCo2Value] = useState(0);
  const [energyGrade, setEnergyGrade] = useState(0);
  const [co2Grade, setCo2Grade] = useState(0);

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

  return (
    <div className="mx-auto p-4 flex flex-col gap-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-4 text-primary-100">
        Résultat du DPE*
      </h2>
      <DPEInput
        value={energyValue}
        setValue={setEnergyValue}
        setGrade={setEnergyGrade}
        thresholds={energyThresholds}
        labels={energyLabels}
        colors={energyColors}
        unit="kWhEP/m²/an"
      />
      <DPEInput
        value={co2Value}
        setValue={setCo2Value}
        setGrade={setCo2Grade}
        thresholds={emissionThresholds}
        labels={energyLabels}
        colors={co2Colors}
        unit="kgCO²/m²/an"
      />
    </div>
  );
};

export default DPESelector;
