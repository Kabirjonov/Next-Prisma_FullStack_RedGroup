import Image from "next/image";
type TProps = {
  series: Series & {
      genres:Genre[]
  }
}
export function VideoModal({series}:TProps) {
  return <section className="relative h-[70vh] w-full">
    <Image fill priority className="object-cover" src={series.} />
    <div className="absolute bottom-10 left-10 max-w-xl">
      <h1 className="text-4xl font-bold mb-4 ">{ series.title}<h1>

    </div>
  </section>;
}
