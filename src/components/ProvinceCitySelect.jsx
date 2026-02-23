"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  getProvinces,
  getCitiesByProvinceId,
  findProvinceByName,
  findCityByName,
} from "@/services/location/provinceCityService";

const PROVINCE_PLACEHOLDER = "استان را انتخاب کنید";
const CITY_PLACEHOLDER = "شهر را انتخاب کنید";

/**
 * کامپوننت قابل استفاده مجدد برای انتخاب استان و شهر.
 * استان از API لود می‌شود؛ با انتخاب استان، شهرهای همان استان لود می‌شوند.
 *
 * @param {Object} props
 * @param {string} [props.province] - مقدار استان (نام)
 * @param {string} [props.city] - مقدار شهر (نام)
 * @param {function({ province: string, city: string }): void} props.onChange - هنگام تغییر انتخاب
 * @param {string} [props.provinceLabel="استان"]
 * @param {string} [props.cityLabel="شهر"]
 * @param {string} [props.className]
 * @param {boolean} [props.disabled]
 * @param {string} [props.provinceError]
 * @param {string} [props.cityError]
 */
export default function ProvinceCitySelect({
  province = "",
  city = "",
  onChange,
  provinceLabel = "استان",
  cityLabel = "شهر",
  className = "",
  disabled = false,
  provinceError,
  cityError,
}) {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingProvinces, setLoadingProvinces] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);
  const [selectedProvinceId, setSelectedProvinceId] = useState(null);

  const loadProvinces = useCallback(async () => {
    try {
      setLoadingProvinces(true);
      const list = await getProvinces();
      setProvinces(list);
    } catch (e) {
      console.error("Error loading provinces:", e);
      setProvinces([]);
    } finally {
      setLoadingProvinces(false);
    }
  }, []);

  useEffect(() => {
    loadProvinces();
  }, [loadProvinces]);

  // وقتی مقدار اولیه province داریم، استان را پیدا کن و شهرها را لود کن
  useEffect(() => {
    if (!province || !provinces.length) {
      if (!selectedProvinceId) setCities([]);
      return;
    }
    const p = findProvinceByName(province, provinces);
    if (p) {
      setSelectedProvinceId(p.id);
      (async () => {
        setLoadingCities(true);
        try {
          const list = await getCitiesByProvinceId(p.id);
          setCities(list);
        } catch (e) {
          console.error("Error loading cities:", e);
          setCities([]);
        } finally {
          setLoadingCities(false);
        }
      })();
    } else {
      setCities([]);
      setSelectedProvinceId(null);
    }
  }, [province, provinces]);

  const handleProvinceChange = useCallback(
    (value) => {
      const id = value ? Number(value) : null;
      setSelectedProvinceId(id);
      setCities([]);
      const p = provinces.find((x) => x.id === id);
      if (p) {
        setLoadingCities(true);
        getCitiesByProvinceId(p.id)
          .then((list) => {
            setCities(list);
            onChange?.({ province: p.name, city: "" });
          })
          .catch((e) => {
            console.error("Error loading cities:", e);
            setCities([]);
            onChange?.({ province: p.name, city: "" });
          })
          .finally(() => setLoadingCities(false));
      } else {
        onChange?.({ province: "", city: "" });
      }
    },
    [provinces, onChange]
  );

  const handleCityChange = useCallback(
    (value) => {
      const c = cities.find((x) => String(x.id) === value);
      const cityName = c ? c.name : "";
      const p = provinces.find((x) => x.id === selectedProvinceId);
      const provinceName = p ? p.name : province;
      onChange?.({ province: provinceName, city: cityName });
    },
    [cities, selectedProvinceId, province, onChange]
  );

  const selectedCityId = city && cities.length
    ? (findCityByName(city, cities)?.id ?? null)
    : null;

  return (
    <div className={className}>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          {provinceLabel && (
            <Label className="text-right">{provinceLabel}</Label>
          )}
          <Select
            value={selectedProvinceId ? String(selectedProvinceId) : ""}
            onValueChange={handleProvinceChange}
            disabled={disabled || loadingProvinces}
          >
            <SelectTrigger className="bg-gray-50 dark:bg-dark-field dark:border-none max-md:text-sm">
              <SelectValue placeholder={PROVINCE_PLACEHOLDER} />
            </SelectTrigger>
            <SelectContent>
              {provinces.map((p) => (
                <SelectItem key={p.id} value={String(p.id)}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {provinceError && (
            <p className="text-sm text-red-500">{provinceError}</p>
          )}
        </div>
        <div className="grid gap-2">
          {cityLabel && (
            <Label className="text-right">{cityLabel}</Label>
          )}
          <Select
            value={selectedCityId ? String(selectedCityId) : ""}
            onValueChange={handleCityChange}
            disabled={disabled || loadingCities || !selectedProvinceId}
          >
            <SelectTrigger className="bg-gray-50 dark:bg-dark-field dark:border-none max-md:text-sm">
              <SelectValue placeholder={CITY_PLACEHOLDER} />
            </SelectTrigger>
            <SelectContent>
              {cities.map((c) => (
                <SelectItem key={c.id} value={String(c.id)}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {cityError && (
            <p className="text-sm text-red-500">{cityError}</p>
          )}
        </div>
      </div>
    </div>
  );
}
