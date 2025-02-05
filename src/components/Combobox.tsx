import { useCombobox } from 'downshift';
import ChevronDownIcon from '/public/assets/svg/ChevronDownIcon.svg';
import ChevronUpIcon from '/public/assets/svg/ChevronUpIcon.svg';
import { twMerge } from 'tailwind-merge';

type Props<T> = {
  label?: string;
  placeholder: string;
  items: T[];
  disabled?: boolean;
  onSelect?: (item: T) => void;
  reset?: boolean;
};

/** width에 대한 지정이 미정인 상태 */

export default function Combobox<T extends { label: string; value: string }>({
  label,
  placeholder,
  items,
  disabled,
  onSelect,
  reset = false,
}: Props<T>) {
  // const width = '116';

  const {
    isOpen,
    getLabelProps,
    getInputProps,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
    selectedItem,
    selectItem,
  } = useCombobox({
    onInputValueChange({ inputValue }) {
      const item = items.find((item) => item.label === inputValue)!;
      if (onSelect) {
        onSelect(item);
      }
      console.log(reset);
      if (reset) {
        selectItem(null);
      }
    },
    items,
    itemToString(item) {
      return item ? item.label : placeholder;
    },
  });
  return (
    <div className={`relative w-full flex-1`}>
      {label && <label {...getLabelProps()}>{label}</label>}
      <div
        className={
          'group flex flex-1 items-center gap-2 rounded-lg border  border-neutral-gray-300 bg-neutral-gray-0 px-3 py-2 hover:bg-neutral-gray-50'
        }
      >
        <input
          readOnly
          placeholder={placeholder}
          {...getInputProps()}
          className={
            'body1 w-full bg-neutral-gray-0 outline-none placeholder:text-neutral-gray-950 disabled:placeholder:text-neutral-gray-300 group-hover:bg-neutral-gray-50'
          }
          disabled={disabled}
        />

        <button
          className={'stroke-neutral-gray-950 disabled:stroke-neutral-gray-300'}
          disabled={disabled}
          {...getToggleButtonProps()}
        >
          {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </button>
      </div>
      <ul
        {...getMenuProps()}
        style={{ transform: 'translateY(calc(100% + 8px))' }}
        className={`absolute bottom-0 w-full rounded-lg border border-neutral-gray-300 bg-neutral-gray-0 p-2 ${!(isOpen && items.length) && 'hidden'}`}
      >
        {isOpen &&
          items.map((item, index) => (
            <li
              {...getItemProps({ item, index })}
              key={item.value}
              className={twMerge(
                'body2 w-full bg-neutral-gray-0 px-[10px] py-[6px] hover:bg-neutral-gray-50',
                selectedItem?.label === item.label && 'bg-primary-50 text-primary-600',
              )}
            >
              <span>{item.label}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}
