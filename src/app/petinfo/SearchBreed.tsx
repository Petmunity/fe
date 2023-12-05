"use client";

import React, { useEffect, useState } from "react";

import DogData from "@/mock/dog.json";
import CatData from "@/mock/cat.json";
import { debounce } from "@/utils/debounce";

interface SearchBreedProps {
  setValue: any;
  closeModal: () => void;
  pet: string;
}

interface Breed {
  id: number;
  name: string;
}

const SearchBreed = ({ setValue, closeModal, pet }: SearchBreedProps) => {
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<Breed[]>([]);

  const debouncedSearch = debounce((value) => {
    if (pet === "dog") {
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
    setValue("breed", selectedBreed);
    closeModal();
  };

  useEffect(() => {
    setSearchResult(pet === "dog" ? DogData : CatData);
  }, [pet]);

  return (
    <div className="h-full w-full">
      <input
        type="text"
        className="w-full rounded-sm border border-gray-100 px-3 py-2.5"
        placeholder="아이의 종을 검색해주세요!"
        value={search}
        onChange={handleSearch}
      />

      <div className="flex flex-col px-4 overflow-y-auto max-h-80">
        {searchResult.length > 0 &&
          searchResult.map((breedItem: any) => (
            <div
              key={`${breedItem.id}_${breedItem.name}`}
              className="flex cursor-pointer items-center gap-x-1 py-4"
              onClick={() => handleBreedClick(breedItem.name)}
            >
              <span className="text-gray-900">{breedItem.name}</span>
            </div>
          ))}

        {searchResult.length === 0 && search !== "" && (
          <div className="text-gray-500 py-2">검색 결과가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default SearchBreed;
