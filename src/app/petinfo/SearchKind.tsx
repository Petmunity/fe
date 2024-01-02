"use client";

import React, { useEffect, useState } from "react";

import DogData from "@/mock/dog.json";
import CatData from "@/mock/cat.json";
import { debounce } from "@/utils/debounce";

interface SearchKindProps {
  setValue: any;
  closeModal: () => void;
  type: string;
}

interface Breed {
  id: number;
  name: string;
}

const SearchKind = ({ setValue, closeModal, type }: SearchKindProps) => {
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Breed[]>([]);

  const debouncedSearch = debounce((value) => {
    if (type === "dog") {
      setSearchResult(DogData.filter((dog) => dog.name.includes(value)));
    } else {
      setSearchResult(CatData.filter((cat) => cat.name.includes(value)));
    }
  }, 300);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
    debouncedSearch(value);
  };

  const handleBreedClick = (selectedBreed: string) => {
    setValue("kind", selectedBreed);
    closeModal();
  };

  useEffect(() => {
    setSearchResult(type === "dog" ? DogData : CatData);
  }, [type]);

  return (
    <div className="h-full w-full">
      <input
        type="text"
        className="w-full rounded-sm border border-gray-100 px-3 py-2.5"
        placeholder="아이의 종을 검색해주세요!"
        value={search}
        onChange={handleSearch}
      />

      <div className="flex flex-col px-4 overflow-y-auto h-72">
        {searchResult.length > 0 &&
          searchResult.map((breed: Breed) => (
            <div
              key={`${breed.id}_${breed.name}`}
              className="flex cursor-pointer items-center gap-x-1 py-4"
              onClick={() => handleBreedClick(breed.name)}
            >
              <span className="text-gray-900">{breed.name}</span>
            </div>
          ))}

        {searchResult.length === 0 && search !== "" && (
          <div className="text-gray-500 py-2">검색 결과가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default SearchKind;
