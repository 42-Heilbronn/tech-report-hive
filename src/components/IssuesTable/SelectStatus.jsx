'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import Badge from '../Badge';

const SelectStatus = ({ user, status, handleStatus, open, setOpen }) => {
  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div>
            <Badge variant={status} />
          </div>
        </PopoverTrigger>
        {user.admin && (
          <PopoverContent
            className=" flex w-[110px] flex-col gap-2 divide-y text-sm"
            side="bottom"
            align="start"
            onClick={(event) =>
              handleStatus(event.target.getAttribute('value'))
            }
          >
            <div className="flex flex-col gap-2">
              <p
                value="open"
                className="cursor-pointer hover:font-semibold hover:text-slate-500"
              >
                Open
              </p>
              <p
                value="ongoing"
                className="cursor-pointer hover:font-semibold hover:text-horange"
              >
                Ongoing
              </p>
              <p
                value="resolved"
                className="cursor-pointer hover:font-semibold hover:text-hgreen"
              >
                Resolved
              </p>
            </div>

            <div className="cursor-pointer pt-2 text-red-600 hover:font-semibold">
              <p value="delete">Delete</p>
            </div>
          </PopoverContent>
        )}
      </Popover>
    </div>
  );
};
export default SelectStatus;
