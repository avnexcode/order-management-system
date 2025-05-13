import {
  DashboardLayout,
  DashboardSection,
  PageContainer,
  SectionContainer,
} from "@/components/layouts";
import { type GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { DashboardBadge } from "../components";
import { api } from "@/utils";

export const DashboardPageSSR: GetServerSideProps = async ({ req }) => {
  const cookies = req.headers.cookie ?? "";
  const sidebarDefaultOpen = cookies.includes("sidebar_state=true");

  return {
    props: { sidebarDefaultOpen },
  };
};

type DashboardPageProps = {
  sidebarDefaultOpen: boolean;
};

export const DashboardPage = () => {
  const router = useRouter();

  const { data: stats, isLoading: isStatsLoading } =
    api.stats.getAllStats.useQuery();

  useEffect(() => {
    if (Object.keys(router.query).length > 0) {
      void router.replace({ pathname: router.pathname, query: {} }, undefined, {
        shallow: true,
      });
    }
  }, [router]);

  return (
    <PageContainer title="Dashboard">
      <SectionContainer padded>
        <DashboardSection
          title="Dashboard"
          description="Halaman ini menampilkan ringkasan statistik dari data yang tercatat dalam sistem. Pengguna dapat melihat informasi dasar seperti total pelanggan, produk, kategori produk, pesanan, dan transaksi. Statistik ini membantu memberikan gambaran umum secara cepat tanpa perlu melihat detail data satu per satu."
        >
          <main className="grid grid-cols-[repeat(auto-fit,minmax(500px,1fr))] gap-5">
            <DashboardBadge
              title="Pelanggan"
              stats={stats?.customer}
              isLoading={isStatsLoading}
            />
            <DashboardBadge
              title="Produk"
              stats={stats?.product}
              isLoading={isStatsLoading}
            />
            <DashboardBadge
              title="Kategori Produk"
              stats={stats?.category}
              isLoading={isStatsLoading}
            />
            <DashboardBadge
              title="Pesanan"
              stats={stats?.order}
              isLoading={isStatsLoading}
            />
            <DashboardBadge
              title="Transaksi"
              stats={stats?.transaction}
              isLoading={isStatsLoading}
            />
          </main>
        </DashboardSection>
      </SectionContainer>
    </PageContainer>
  );
};

DashboardPage.getLayout = (page: React.ReactElement) => {
  const pageProps = page.props as DashboardPageProps;
  return (
    <DashboardLayout sidebarDefaultOpen={pageProps.sidebarDefaultOpen}>
      {page}
    </DashboardLayout>
  );
};
