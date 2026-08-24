export default function AnnouncementBar() {
  return (
    <div className="bg-[#ccb27a] overflow-hidden whitespace-nowrap py-2">
      <div className=" flex w-max gap-16 animate-marquee">
        {[...Array(3)].map((_, index) => (
          <span
            key={index}
            className="text-black italic font-medium text-sm shrink-0"
          >
            <span> WELCOME TO SHEWINGS BY SEJAL </span>
          </span>
        ))}
      </div>
    </div>
  );
}
