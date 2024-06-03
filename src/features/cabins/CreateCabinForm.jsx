import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

import { useAddCabin } from "./useAddCabin";
import { useUpdateCabin } from "./useUpdateCabin";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

CreateCabinForm.propTypes = {
    editedData: PropTypes.object,
    onCloseModal: PropTypes.func,
};

function CreateCabinForm({ editedData = {}, onCloseModal }) {
    const { id: editId } = editedData;
    // karena kita menggunakan form sama untuk meng-edit dan menambahakan data baru, diperlukan pembeda apakah kita akan membuat item cabin yang baru atau sedang meng-edit data yang dari cabin item, sehingga diperlukan untuk membuat nilai boolean guna membedakan kedua proses tsb
    const editSession = Boolean(editId);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        getValues,
        // pda pengguan hook useForm() dari react-hook-form, kita bisa mennggunakan property yang disebut default value untuk menempelkan nilai default pada tiap form, pada kasus kali ini, property defaultValue digunakan untuk meng-edit/update data yang sudah ada pada table database
    } = useForm({ defaultValues: editSession ? editedData : {} });

    const { loadingAdd, mutateAdd } = useAddCabin();
    const { loadingUpdate, mutateUpdate } = useUpdateCabin();

    // TODO: function untuk submit data yang sudah dituliskan oleh user
    function onSubmit(data) {
        {
            // ? console.log(data)
            editSession
                ? mutateUpdate(
                      typeof data?.image === "object"
                          ? { ...data, image: data?.image[0] }
                          : data,
                      //   {
                      //       onSuccess: () => {
                      //           onCloseModal?.();
                      //       },
                      //   },
                  )
                : mutateAdd(
                      { ...data, image: data?.image[0] },
                      {
                          onSuccess: () => {
                              reset();
                              onCloseModal?.();
                          },
                      },
                  );
        }
    }

    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
            type={onCloseModal ? "modal" : "regular"}
        >
            <FormRow label="Cabin name" error={errors?.name}>
                <Input
                    type="text"
                    id="name"
                    disabled={loadingAdd || loadingUpdate}
                    {...register("name", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <FormRow label="Maximum capacity" error={errors?.maxCapacity}>
                <Input
                    type="number"
                    id="maxCapacity"
                    disabled={loadingAdd || loadingUpdate}
                    {...register("maxCapacity", {
                        required: "This field is required",
                        min: {
                            value: 1,
                            message: "Capacity should be at least 1",
                        },
                    })}
                />
            </FormRow>

            <FormRow label="Regular price" error={errors?.regularPrice}>
                <Input
                    type="number"
                    id="regularPrice"
                    disabled={loadingAdd || loadingUpdate}
                    {...register("regularPrice", {
                        required: "This field is required",
                        min: {
                            value: 1,
                            message: "Price should be at least 1",
                        },
                    })}
                />
            </FormRow>

            <FormRow label="Discount" error={errors?.discount}>
                <Input
                    type="number"
                    id="discount"
                    disabled={loadingAdd || loadingUpdate}
                    defaultValue={0}
                    {...register("discount", {
                        required: "Can't be empty, make it at least 0",
                        validate: (value) =>
                            // method getValues() digunakan untuk meng-get value dari input field yang dituju dan nantinya akan digunakan sebagai validasi nilai, seperti contoh kasus pada validate input form ini
                            parseInt(value) < getValues("regularPrice") ||
                            "Discount should be less than regular price",
                        // parseInt(value) < getValues().regularPrice ||
                    })}
                />
            </FormRow>

            <FormRow
                label="Description for website"
                error={errors?.description}
            >
                <Textarea
                    type="number"
                    id="description"
                    disabled={loadingAdd || loadingUpdate}
                    defaultValue=""
                    {...register("description", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <FormRow label="Cabin photo" error={errors.image}>
                <FileInput
                    id="image"
                    accept="image/*"
                    disabled={loadingAdd || loadingUpdate}
                    {...register("image", {
                        required: editSession
                            ? false
                            : "This field is required",
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                {!editSession && (
                    <Button variation="secondary" type="reset">
                        clear
                    </Button>
                )}
                <Button disabled={loadingAdd || loadingUpdate}>
                    {editSession ? "update cabin" : "add cabin"}
                </Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
