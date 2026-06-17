import { useEffect, useState } from "react";
import { api } from "../services/api";

export function useServices() {
    const [services, setServices] =
        useState<any>(null);

    async function fetchServices() {

        const response =
        await api.get("/api/services");

        setServices(
        response.data
        );
    }

    useEffect(() => {
        fetchServices();
    }, []);

    return {
        services,
        refetchServices: fetchServices,
    };
}