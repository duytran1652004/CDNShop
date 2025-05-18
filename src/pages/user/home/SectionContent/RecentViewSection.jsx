import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import AuthContext from "../../../../context/AuthContext";
import ProductViewHistoryService from "../../../../service/UserService/ProductViewHistoryService";
import SectionContent from "./SectionContent";

const RecentViewSection = () => {
  const { user_id } = useContext(AuthContext);

  const { data, isLoading } = useQuery({
    queryKey: ["recentViews", user_id],
    queryFn: () => ProductViewHistoryService.getHistoryViews(user_id),
    enabled: !!user_id,
  });

  if (isLoading || !data || data.length === 0) return null;

  return (
    <SectionContent isDetail={false} title="Xem gần đây" products={data} />
  );
};

export default RecentViewSection;
