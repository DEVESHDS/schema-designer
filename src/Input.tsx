import { forwardRef, useEffect, useRef, useState } from "react";

export const Input = forwardRef<any, any>(function (props, ref) {
  const span = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState<number | undefined>(
    span.current?.offsetWidth
  );

  useEffect(() => {
    if (span.current) setWidth(span.current.offsetWidth);
  }, [props.value]);

  return (
    <>
      <span
        style={{
          position: "absolute",
          opacity: 0,
          zIndex: -100,
          whiteSpace: "pre",
        }}
        ref={span}
      >
        {props.value}
      </span>
      <input
        {...props}
        type="text"
        ref={ref}
        style={{ width: width, maxWidth: "70px" }}
      />
    </>
  );
});
