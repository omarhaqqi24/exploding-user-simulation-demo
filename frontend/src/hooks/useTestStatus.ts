import { useEffect, useState } from "react";

import { getTestStatus } from "../services/testApi";

export function useTestStatus() {

    const [status, setStatus] =
        useState<any>(null);

    useEffect(() => {

        const interval = setInterval(
        async () => {

            try {

            const response =
                await getTestStatus();

            setStatus(
                response.data
            );

            } catch (error) {

            console.error(error);

            }

        },
        1000
        );

        return () =>
        clearInterval(interval);

    }, []);

    return status;
}