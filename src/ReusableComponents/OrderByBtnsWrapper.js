import { useReducer, useRef } from "react";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import OrderByBtn from "./OrderByBtn";

const OrderByBtnsWrapper = ({
  onDateClick,
  onPriorityClick,
  onAlphabeticallyClick,
  onAscClick,
  onDescClick,
  className = "",
  order = "desc",
}) => {
  const initialState = [
    {
      id: 0,
      label: "Date",
      className: "active",
      onClick: () => onDateClick(),
    },
    {
      id: 1,
      label: "Priority",
      className,
      onClick: () => onPriorityClick(),
    },
    {
      id: 2,
      label: "Alphabetically",
      className,
      onClick: () => onAlphabeticallyClick(),
    },
  ];

  const reducer = (state, action) => {
    switch (action.type) {
      case "setActive": {
        const btns = state.map((btn) => ({
          ...btn,
          className: btn.id === action.payload ? "active" : "",
        }));

        return btns;
      }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const setActive = (btnId) => {
    dispatch({ type: "setActive", payload: btnId });
  };

  const ref = useRef(null);
  window.addEventListener("scroll", () => {
    if (Boolean(ref.current)) {
      const el = ref.current;
      el.classList[window.pageYOffset > el.offsetTop ? "add" : "remove"](
        "sticky"
      );
    }
  });

  return (
    <div className="OrderByBtns__Wrapper" ref={ref}>
      <p className="OrderByTitle">Order By</p>
      {state.map((btn) => (
        <OrderByBtn
          key={btn.id}
          label={btn.label}
          className={btn.className}
          onClick={() => {
            btn.onClick();
            setActive(btn.id);
          }}
        />
      ))}

      <BsArrowDown
        title="desc"
        className={`sortDirectionBtn icon ${order === "desc" && "active"}`}
        onClick={() => onDescClick()}
      />

      <BsArrowUp
        title="asc"
        className={`sortDirectionBtn icon ${order === "asc" && "active"}`}
        onClick={() => onAscClick()}
      />
    </div>
  );
};

export default OrderByBtnsWrapper;
