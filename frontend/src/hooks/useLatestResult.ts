import { useEffect, useState } from "react";
import { api } from "../services/api";

export function useLatestResult() {

    const [result, setResult] = useState<any>(null);

    useEffect(() => {
        async function fetchLatest() {

            try {

                const response =
                await api.get(
                    "/api/tests/latest"
                );

                setResult(
                response.data
                );

            } catch (error) {

                console.error(error);

            }

        }

        fetchLatest();

        const interval =
        setInterval(
            fetchLatest,
            3000
        );

        return () =>
        clearInterval(interval);

    }, []);

    return result;
}