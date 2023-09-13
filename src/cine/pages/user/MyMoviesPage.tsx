import { useSearchParams } from "react-router-dom";

export const MyMoviesPage = () => {
    const [searchParams, /* setSearchParams */] = useSearchParams()

    console.log(searchParams.get("upload"))
	return <div>MyMoviesPage</div>;
};
