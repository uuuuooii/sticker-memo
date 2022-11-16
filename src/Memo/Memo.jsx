/* eslint-disable no-undef */
import React, { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import CloseIcon from "@mui/icons-material/Close";
import "./Memo.scss";
import Draggable from "@uuuuooii/draggable";
import { debounce } from "underscore";
import { height, width } from "@mui/system";

function Memo({ item, Delete, Edit, SetPosition, SetWidthHeight }) {
  const handleRef = useRef(null);
  const memoContainer = useRef(null);
  const onChangeMemo = useMemo(
    () => debounce((e) => Edit(item.id, e.target.value), 1000),
    [item.id, Edit]
  );

  useEffect(() => {
    onChangeMemo.cancel();
  }, [onChangeMemo]);

  const onChangeSize = useMemo(
    () =>
      debounce(() => {
        const { width, height } = entry[0].contentRect;
        SetWidthHeight(item.id, width, height);
      }, 100),
    [item.id, SetWidthHeight]
  );

  useLayoutEffect(() => {
    let RO = new ResizeObserver(onChangeSize);
    RO.observe(memoContainer.current);
    return () => {
      RO.disconnect();
      RO = null;
    };
  });
  return (
    <Draggable
      handleRef={handleRef}
      x={0}
      y={0}
      onMove={(x, y) => console.log(x, y)}
    >
      <div
        className="memo-container"
        style={{ width: `${250}px`, height: `${300}px` }}
        ref={memoContainer}
      >
        <div className="menu">
          <DragHandleIcon
            ref={handleRef}
            sx={{ cursor: "move", fontSize: "25px" }}
          />
          <CloseIcon
            sx={{ cursor: "pointer", fontSize: "25px", float: "right" }}
          />
        </div>
        <textarea
          className="memo-text-area"
          defaultValue={item.content}
          name="txt"
          placeholder="Enter memo here"
          onClick={onChangeMemo}
        ></textarea>
      </div>
    </Draggable>
  );
}

export default Memo;
