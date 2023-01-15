import RoundImage from "../ui/components/RoundImage/RoundImage";
export default function Web() {
  return (
    <div>
      <h1>Wir lieben Natürlichkeit</h1>
      <RoundImage
        alt="Nice Image"
        image="https://images.unsplash.com/photo-1441829266145-6d4bfbd38eb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2VhfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=800&q=60"
        initialWidth={60}
      />
    </div>
  );
}
