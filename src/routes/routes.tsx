import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { HomeLayout } from "../components/templates/HomeLayout";
import { ROUTES } from "../lib/constants";
import { BudgetsPage } from "../pages/BudgetPage";
import { CategoriesPage } from "../pages/CategoriesPage";
import { GoalDetailsPage } from "../pages/GoalDetailsPage";
import { GoalsPage } from "../pages/GoalsPage";
import { HomePage } from "../pages/HomePage";
import { LoanDetailsPage } from "../pages/LoanDetailsPage";
import { LoansPage } from "../pages/LoansPage";
import { LoginPage } from "../pages/LoginPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { PocketsPage } from "../pages/PocketsPage";
import { RegisterPage } from "../pages/RegisterPage";
import { TransactionsPage } from "../pages/TransactionsPage";
import PrivateRoute from "./PrivateRoute";

export default function RoutesPage() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomeLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to={ROUTES.HOME} replace />} />
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.CATEGORIES} element={<CategoriesPage />} />
          <Route path={ROUTES.POCKETS} element={<PocketsPage />} />
          <Route
            path={`${ROUTES.TRANSACTIONS}/:categoryName`}
            element={<TransactionsPage />}
          />
          <Route path={ROUTES.LOANS} element={<LoansPage />} />
          <Route
            path={`${ROUTES.LOANS}/:loanId`}
            element={<LoanDetailsPage />}
          />
          <Route path={ROUTES.GOALS} element={<GoalsPage />} />
          <Route
            path={`${ROUTES.GOALS}/:goalId`}
            element={<GoalDetailsPage />}
          />
          <Route path={ROUTES.BUDGETS} element={<BudgetsPage />} />
        </Route>

        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
