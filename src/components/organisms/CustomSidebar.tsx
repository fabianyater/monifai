import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { formatAmount } from "../../lib/helpers/formatAmount";
import { usePocketStore } from "../../lib/store/usePocketStore";
import { useAllPocketsBalance } from "../../services/pockets/queries";
import { MaiMenu } from "../molecules/MaiMenu";

interface CustomSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomSidebar = ({ isOpen, onClose }: CustomSidebarProps) => {
  const [isBalanceVisible, setIsBalanceVisible] = useState<boolean>(false);
  const selectedPocket = usePocketStore((state) => state.selectedPocket);

  const { queryKey: queryKeyBalance, queryFn: queryFnBalance } =
    useAllPocketsBalance();
  const { data: balance } = useQuery({
    queryKey: queryKeyBalance,
    queryFn: queryFnBalance,
    enabled: !!selectedPocket?.id,
  });

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity duration-300"
          onClick={handleBackdropClick}
        ></div>
      )}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-xl z-40 transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
                MonifAI
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 overflow-y-auto">
            <MaiMenu onHide={onClose} />
          </nav>

          {/* Bottom Section */}
          <div className="p-3 border-t border-gray-100 dark:border-gray-800">
            <div className="flex">
              <div className="flex flex-col gap-4 p-4">
                <div className="flex flex-col justify-between items-start gap-2">
                  <div className="flex items-center justify-center gap-2">
                    <h1 className="text-2xl font-bold text-white">
                      Balance total
                    </h1>
                    <i
                      className={`text-white pi ${
                        isBalanceVisible ? "pi-eye-slash" : "pi-eye"
                      }`}
                      onClick={() => setIsBalanceVisible(!isBalanceVisible)}
                    />
                  </div>
                  {isBalanceVisible ? (
                    <span className="text-white">
                      {formatAmount(balance?.totalBalance ?? 0)}
                    </span>
                  ) : (
                    <span className="text-white">*******</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
