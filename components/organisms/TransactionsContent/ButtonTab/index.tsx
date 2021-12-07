import cx from "classnames";

interface ButtonTabProps {
  title: string;
  active?: boolean;
  onClick: () => void;
}

function ButtonTab(props: Partial<ButtonTabProps>) {
  const { title, active = false, onClick } = props;

  const buttonClass = cx({
    "btn btn-status rounded-pill text-sm me-3": true,
    "btn-active": active,
  });

  return (
    <button onClick={onClick} type="button" className={buttonClass}>
      {title}
    </button>
  );
}

export default ButtonTab;
