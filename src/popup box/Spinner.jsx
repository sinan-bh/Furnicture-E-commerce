import { SyncLoader } from "react-spinners";

const Spinner = ({ loading, size = 150, color = "#131842" }) => {
  return (
    <div className="spinner">
      <SyncLoader color={color} loading={loading} height={size} />
    </div>
  );
};

export default Spinner;