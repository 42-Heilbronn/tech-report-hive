'use client';
import SelectDevice from './SelectDevice';
import SelectHost from './SelectHost';
import Description from './Description';
import Button from '../Button';
import { useForm } from 'react-hook-form';
import { toast } from '@components/ui/use-toast';

const ReportForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data, event) => {
    const response = await fetch('/api/issues', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        host: data.host,
        device: data.device,
        description: data.description,
      }),
    });
    if (response.status === 201) {
      window.location.replace('/thanks');
    } else {
      toast({
        title: 'Error',
        description: 'Something went wrong, check your input and retry.',
        variant: 'destructive',
      });
    }
  };
  return (
    <>
      <form className="my-7" onSubmit={handleSubmit(onSubmit)}>
        <SelectDevice setValue={setValue} register={register} />
        <SelectHost setValue={setValue} register={register} errors={errors} />
        <Description register={register} errors={errors} />
        <div className="mt-8 flex justify-center md:mt-14 md:justify-start md:pl-5">
          <Button type={'submit'}>Submit</Button>
        </div>
      </form>
    </>
  );
};

export default ReportForm;
