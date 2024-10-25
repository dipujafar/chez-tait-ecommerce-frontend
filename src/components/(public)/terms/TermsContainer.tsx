"use client";
import { useGetContentQuery } from "@/redux/api/contentApi";
import Loading from "@/utils/Loading";

const TermsContainer = () => {
  const { data: contentData, isLoading } = useGetContentQuery(undefined);
  const data = contentData?.data?.data[0]?.termsAndConditions;
  return isLoading ? (
    <div className="flex h-[60vh] items-center justify-center">
      <Loading size={36}></Loading>
    </div>
  ) : (
    <div dangerouslySetInnerHTML={{ __html: data }}></div>
  );
};

export default TermsContainer;