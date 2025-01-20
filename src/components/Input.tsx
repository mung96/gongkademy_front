type Props = {
  placeholder?: string;
  onChange: () => void;
};

export default function Input({ placeholder, onChange }: Props) {
  return (
    <input
      onChange={onChange}
      placeholder={placeholder}
      className="body1  h-[42px] w-full rounded-lg bg-neutral-gray-100 px-3 py-2 text-neutral-gray-700 outline-none	outline-offset-0 hover:outline-primary-300 focus:text-neutral-gray-900 focus:caret-primary-600 focus:outline-primary-500 disabled:text-neutral-gray-300 "
    />
  );
}
