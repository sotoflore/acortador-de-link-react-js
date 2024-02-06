import { useEffect, useState } from "react";
import Title from "../components/Title";
import { useFirestore } from "../hooks/useFirestore";
import Button from "../components/Button";

import FormInput from "../components/FormInput";
import FormError from "../components/FormError";
import { useForm } from "react-hook-form";
import { formValidate } from "../utils/formValidate";
import { erroresFirebase } from "../utils/erroresFirebase";

const Home = () => {

    const [copy, setCopy] = useState({});
    const { required, patternURL } = formValidate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        resetField,
        setValue,
        setError,
    } = useForm();

    const { data, error, loading, getData, addData, deleteData, updateData } = useFirestore();

    const [newOriginId, setNewOriginId] = useState();

    useEffect(() =>{
        getData()
    },[]);

    
    if(loading.getData) return <p> loading data getData...</p>
    if(error) return <p>{error}</p>

    const onSubmit = async ( {url} ) =>{
        try {
            if(newOriginId){
                await updateData(newOriginId, url);
                setNewOriginId("");
            } else{
                await addData(url);
            }
            resetField("url");
        } catch (error) {
            const { code, message } = erroresFirebase(error.code);
            setError(code, { message });
        }
    }

    const handleClickDelete = async (nanoid) => {
        await deleteData(nanoid);
    }

    const handleClickEdit =  (item) =>{
        setValue("url", item.origin);
        setNewOriginId(item.nanoid)
    }

    const pathURL = window.location.href;

    const handleClickCopy = async (nanoid) =>{
        await navigator.clipboard.writeText(window.location.href + nanoid);
        setCopy({ [nanoid]: true});
    }

    return (
        <>
            <Title text="home" />

            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    label="Ingresa tu URL"
                    type="text"
                    placeholder="https://ejemplo.com"
                    {...register("url", {
                        required,
                        pattern: patternURL,
                    })}
                    error={errors.url}
                >
                    <FormError error={errors.url} />
                </FormInput>
                {
                    newOriginId ? (
                        <Button 
                            type="submit" 
                            text="Editar URL" 
                            color="green" 
                            loading={loading.updateData}
                        />
                    ): (
                        <Button 
                            type="submit" 
                            text="Agregar URL" 
                            color="blue" 
                            loading={loading.addData}
                        />
                    )
                }
            </form>
            {
                data.map(item => (
                    <div key={item.nanoid} className="p-6 bg-white border border-gray-200 rounded-lg shadow mb-3">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{pathURL}{item.nanoid}</h5>
                        <p className="mb-3 font-normal text-gray-700">{item.origin}</p>
                        <div className="flex space-x-4">
                            <Button 
                                text="Eliminar" 
                                type="button"
                                color="red"  
                                loading={ loading[item.nanoid] }
                                onClick={() => handleClickDelete(item.nanoid)}
                            /> 
                            <Button 
                                text="editar" 
                                type="button"
                                color="blue"  
                                onClick={() => handleClickEdit(item)}
                            />
                            <Button 
                                text={copy[item.nanoid] ? "Copiado" : "Copiar"} 
                                type="button"
                                color="green"  
                                onClick={() => handleClickCopy(item.nanoid)}
                            />  
                        </div> 
                    </div>
                ))
            }
        </>
    );
};

export default Home;
