import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
import PageMeta from "../../components/common/PageMeta";
import { useMembersStore } from "../../stores/members";

export default function Home() {
  const { members } = useMembersStore();

  return (
    <>
      <PageMeta
        title="Gestor de socios - Dashboard"
        description="Panel de visualización del estado global"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics members={members} />
          <MonthlySalesChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget members={members} />
        </div>
      </div>
    </>
  );
}
