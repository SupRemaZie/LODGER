    import { Button } from "@heroui/react";
    import React from "react";
    type ToastColor = "default" | "primary" | "secondary" | "success" | "warning" | "danger";

    export default function LodgerButton({
      type,
      label,
      onPress,
      className,
      isDisabled,
      addToast,
      toast,
    }: {
      type?: "default" | "full-success" | "no-border";
      onPress?: () => void;
      label: string;
      className?: string;
      isDisabled?: boolean;
        addToast?: (opts: { title?: string; description?: string; color?: ToastColor }) => void;
        toast?: { title?: string; description?: string; color?: ToastColor };
    }) {
        const handlePress = React.useCallback(() => {
            onPress?.();

            if (addToast) {
                addToast({
                    title: toast?.title ?? "Toast title",
                    description: toast?.description ?? "Toast displayed successfully",
                    color: toast?.color ?? (type === "full-success" ? "success" : "default"),
                });
            }
        }, [onPress, addToast, toast?.title, toast?.description, toast?.color, type]);

        return (
        <>
          {type === "full-success" ? (
            <Button onPress={onPress} isDisabled={isDisabled} color="success" variant="shadow" className={`text-white font-semibold ${className}`}>{label}</Button>
          ) : type === "no-border" ? (
            <Button onPress={onPress} isDisabled={isDisabled} variant="shadow" className={`border-1 border-gray-200 font-semibold text-primary-100 bg-white ${className}`}>{label}</Button>
          ) : (
            <Button onPress={onPress} isDisabled={isDisabled} variant="shadow" className={`border-2 border-primary-100 text-primary-100 bg-white font-semibold ${className}`}>{label}</Button>
          )}
        </>
      );
    }
