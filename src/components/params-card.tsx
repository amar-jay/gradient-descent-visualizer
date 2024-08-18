import { Switch } from "@/components/ui/switch";

export function ParamsCard({ lines, setLines, markers, setMarkers, type }) {
  return (
    <div className="w-full max-w-lg mx-auto space-y-6 ">
      <h3 className="mb-4 text-lg font-medium">Parameters</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-row items-center justify-between rounded-lg border p-4">
          <h3 className="text-lg font-medium text-left">Lines</h3>
          <Switch
            checked={lines}
            onCheckedChange={() => {
              setLines(!lines);
            }}
          />
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-4">
          <h3 className="text-lg font-medium text-left">Markers</h3>
          <Switch
            checked={markers}
            onCheckedChange={() => {
              setMarkers(!markers);
            }}
          />
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-4">
          <h3 className="text-lg font-medium text-left">Type</h3>
          {type}
        </div>
      </div>
    </div>
  );
}
