"use client";

import { useForm } from "react-hook-form";
import Header from "@/components/common/Header";
import Image from "next/image";
import { toast } from "react-toastify";
import Modal from "@/components/common/Modal";
import useModal from "@/hooks/useModal";
import SearchBreed from "./SearchBreed";

interface FormData {
  name: string;
  age: Date;
  pet: string;
  images: any[];
  sex: string;
  breed: string;
  weight: number;
  neutered: boolean;
}

const validateImages = (value: File[] | undefined) => {
  return value && value.length > 0 ? undefined : "아이의 사진을 추가해주세요!";
};

export default function PetInfoPage() {
  const { isOpen, openModal, closeModal } = useModal();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const watchImages = watch("images");
  const watchPet = watch("pet");

  const handleUploadImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setValue("images", files);
  };

  const deleteImage = (index: number) => {
    if (Array.isArray(watchImages)) {
      const newImages = watchImages.filter((_, i) => i !== index);
      setValue("images", newImages);
    }
  };
  const onSubmit = (data: any) => {
    console.log(data, "data");
    const formData = {
      ...data,
      neutered: data.neutered === "true" ? true : false,
    };
    console.log(formData, "formData");
    toast.success("입력이 완료되었습니다.");
  };

  const openModalHandler = () => {
    if (!watchPet) {
      toast.error("강아지인지 고양이인지 선택해주세요!");
      return;
    }
    openModal();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className="p-5 h-96  flex items-center  flex-col">
          <SearchBreed
            setValue={setValue}
            closeModal={closeModal}
            pet={watchPet}
          />
        </div>
      </Modal>
      <Header title="애완동물 정보 기입" elements={{ left: <Header.Back /> }} />
      <main className="h-screen p-5">
        <form
          className="w-full space-y-4"
          onSubmit={handleSubmit(onSubmit)}
          id="hook-form"
        >
          <div className="grid grid-cols-[0.5fr_2fr] items-center">
            <label htmlFor="name">이름</label>
            <div>
              <input
                className="input-gray"
                type="text"
                id="name"
                {...register("name", {
                  required: "아이의 이름을 입력해주세요!",
                })}
              />
              {errors?.name && (
                <span className="text-red-500">{errors?.name.message}</span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-[0.5fr_1fr_1fr] items-center space-x-2">
            <div className="flex">
              <label>댕/냥</label>
            </div>
            <div className="flex justify-between">
              <label>강아지</label>
              <input
                type="radio"
                {...register("pet", {
                  required: "강아지인지 고양이인지 체크해주세요!",
                })}
                value="dog"
              />
            </div>
            <div className="flex justify-between">
              <label>고양이</label>
              <input
                type="radio"
                {...register("pet", {
                  required: "강아지인지 고양이인지 체크해주세요!",
                })}
                value="cat"
              />
            </div>
          </div>
          <div className="grid grid-cols-[0.5fr_2fr] items-center">
            <label htmlFor="breed">종</label>
            <div>
              <input
                onClick={openModalHandler}
                className="input-gray"
                type="text"
                id="breed"
                readOnly
                {...register("breed", { required: "종을 입력해주세요!" })}
              />
              {errors?.breed && (
                <span className="text-red-500">{errors.breed.message}</span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-[0.5fr_2fr] items-center">
            <label htmlFor="age">나이</label>
            <div>
              <input
                type="date"
                className="input-gray"
                {...register("age", {
                  valueAsDate: true,
                  required: "아이의 생년월일을 입력해주세요!",
                })}
              />
              {errors?.age && (
                <span className="text-red-500">{errors.age.message}</span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-[0.5fr_1fr_1fr] items-center space-x-2">
            <label htmlFor="sex">성별</label>
            <div className="flex justify-between">
              <label>수컷</label>
              <input
                type="radio"
                {...register("sex", {
                  required: "아이의 성별을 등록해주세요!",
                })}
                value="male"
              />
            </div>
            <div className="flex justify-between">
              <label>암컷</label>
              <input
                type="radio"
                {...register("sex", {
                  required: "아이의 성별을 등록해주세요!",
                })}
                value="female"
              />
            </div>
          </div>
          <div className="grid grid-cols-[0.5fr_2fr] items-center">
            <label htmlFor="weight">체중</label>
            <div>
              <input
                className="input-gray"
                type="text"
                id="weight"
                {...register("weight", {
                  required: "아이의 체중을 입력해주세요!",
                  pattern: {
                    value: /^-?\d+(\.\d+)?$/,
                    message: "숫자만 입력해주세요!",
                  },
                })}
                placeholder="4.2kg"
              />
              {errors?.weight && (
                <span className="text-red-500">{errors.weight.message}</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-[0.5fr_1fr_1fr] items-center space-x-2">
            <label htmlFor="neutered">중성화</label>
            <div className="flex justify-between">
              <label>O</label>
              <input
                type="radio"
                {...register("neutered", {
                  required: "중성화 여부를 체크해주세요!",
                })}
                value="true"
              />
            </div>
            <div className="flex justify-between">
              <label>X</label>
              <input
                type="radio"
                {...register("neutered", {
                  required: "중성화 여부를 체크해주세요!",
                })}
                value="false"
              />
            </div>
          </div>

          <div>
            <label htmlFor="file-uploader">사진</label>
            <input
              type="file"
              className="hidden"
              {...register("images", {
                validate: validateImages,
              })}
            />
            <label
              htmlFor="file-uploader"
              className="mt-4 flex w-full cursor-pointer items-center justify-center gap-x-1 rounded-sm border border-gray-200 py-3 text-xs font-medium text-gray-700"
            >
              사진 첨부하기
              <input
                type="file"
                multiple
                hidden
                id="file-uploader"
                onChange={handleUploadImages}
                accept="image/*, video/*"
              />
            </label>
            {watchImages && watchImages.length > 0 && (
              <div className="mb-8 w-full overflow-x-auto">
                <div className="mt-4 flex gap-x-2.5">
                  {watchImages.map((image: File, index: number) => (
                    <div
                      key={image.size + image.type + index}
                      className="mb-2 flex-shrink-0 relative"
                    >
                      <div
                        className="absolute select-none top-0 right-0  text-center cursor-pointer flex items-center justify-center w-5 h-5 rounded-full bg-gray-700 text-white text-xs font-medium"
                        onClick={() => deleteImage(index)}
                      >
                        x
                      </div>
                      <Image
                        src={URL.createObjectURL(image)}
                        alt={`Image ${index}`}
                        width={200}
                        height={150}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {errors?.images && (
              <span className="text-red-500">{errors.images.message}</span>
            )}
          </div>
        </form>
      </main>
      <section id="CTA" className="sticky bottom-0 bg-white px-5 pb-4">
        <button type="submit" form="hook-form" className="button-violet">
          Submit
        </button>
      </section>
    </>
  );
}
