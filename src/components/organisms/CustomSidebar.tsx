import { useQuery } from "@tanstack/react-query";
import { Sidebar } from "primereact/sidebar";
import { useState } from "react";
import { formatAmount } from "../../lib/helpers/formatAmount";
import { useAllPocketsBalance } from "../../services/pockets/queries";
import { MaiMenu } from "../molecules/MaiMenu";

type CustomSidebarProps = {
  visible: boolean;
  onHide: () => void;
};

export const CustomSidebar = ({ visible, onHide }: CustomSidebarProps) => {
  const [isBalanceVisible, setIsBalanceVisible] = useState<boolean>(false);
  const { queryKey, queryFn } = useAllPocketsBalance();
  const { data } = useQuery({
    queryKey,
    queryFn,
  });

  return (
    <Sidebar
      visible={visible}
      onHide={() => onHide()}
      style={{ backgroundColor: "#2D2D2D" }}
      color="#fff"
    >
      <MaiMenu onHide={onHide} />
      <div className="flex">
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-col justify-between items-start gap-2">
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-2xl font-bold text-white">Balance total</h1>
              <i
                className={`text-white pi ${ 
                  isBalanceVisible ? "pi-eye-slash" : "pi-eye"
                }`}
                onClick={() => setIsBalanceVisible(!isBalanceVisible)}
              />
            </div>
            {isBalanceVisible ? (
              <span className="text-white">
                {formatAmount(data?.totalBalance ?? 0)}
              </span>
            ) : (
              <span className="text-white">*******</span>
            )}
          </div>
        </div>
      </div>
    </Sidebar>
  );
};
