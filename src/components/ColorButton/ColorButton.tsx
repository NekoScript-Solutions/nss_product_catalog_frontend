'use client';

import style from './ColorButton.module.scss'
import classNames from "classnames";

interface Props {
  color: string;
  selected: boolean;
  onClick: (color: string) => void;
}

export default function ColorButton({color, selected, onClick}: Props) {
  return (
    <button className={classNames({
      [style.button]: true,
      [style.button_selected]: selected,
    })}>
      <div
        className={style.button__color}
        style={{
            backgroundColor: color,
            opacity: 0.8
          }}
        onClick={() => onClick(color)}
      />
    </button>
  )
}
