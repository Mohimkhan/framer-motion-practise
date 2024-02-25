import { motion, stagger, useAnimate } from 'framer-motion';
import { useEffect, useState } from 'react';

const persons = [
   {
      imgUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
      name: 'Andrew Tate',
   },
   {
      imgUrl: 'https://randomuser.me/api/portraits/women/17.jpg',
      name: 'Sara Tate',
   },
   {
      imgUrl: 'https://randomuser.me/api/portraits/men/34.jpg',
      name: 'David Harvee',
   },
   {
      imgUrl: 'https://randomuser.me/api/portraits/men/41.jpg',
      name: 'Thomas Clark',
   },
   {
      imgUrl: 'https://randomuser.me/api/portraits/women/14.jpg',
      name: 'Mary Johnson',
   },
   {
      imgUrl: 'https://randomuser.me/api/portraits/men/12.jpg',
      name: 'John Williams',
   },
   {
      imgUrl: 'https://randomuser.me/api/portraits/women/64.jpg',
      name: 'James Smith',
   },
];

const staggerMenuItems = stagger(0.1, { startDelay: 0.15 });

const useMenuAnimation = (isMenuOpen) => {
   const [scope, animate] = useAnimate();

   useEffect(() => {
      animate('.arrow', { rotate: isMenuOpen ? 180 : 0 }, { duration: 0.2 });

      animate(
         'ul',
         {
            clipPath: isMenuOpen
               ? 'inset(0% 0% 0% 0% round 10px)'
               : 'inset(10% 50% 90% 50% round 10px)',
         },
         {
            type: 'spring',
            bounce: 0,
            duration: 0.5,
         }
      );

      animate(
         'li',
         isMenuOpen
            ? { opacity: 1, scale: 1, filter: 'blur(0px)' }
            : { opacity: 0, scale: 0.3, filter: 'blur(20px)' },
         {
            duration: 0.2,
            delay: isMenuOpen ? staggerMenuItems : 0,
         }
      );
   }, [isMenuOpen, animate]);

   return scope;
};

const Menu = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const scope = useMenuAnimation(isMenuOpen);

   return (
      <div
         className="flex justify-center items-start flex-col gap-4"
         ref={scope}
      >
         <motion.button
            className="flex justify-between items-center rounded-full shadow-md px-4 py-2 w-1/2"
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
         >
            <p className="font-bold text-2xl text-center text-purple-800">
               Menu
            </p>
            <span
               className="arrow size-0 border-solid border-transparent border-b-purple-800 border-t-0 border-r-[14px] border-l-[14px] border-b-[16px]"
               style={{ transformOrigin: '50% 55%' }}
            ></span>
         </motion.button>

         <ul
            className="space-y-3 w-1/2 shadow-md p-2 rounded-lg"
            style={{
               pointerEvents: isMenuOpen ? 'auto' : 'none',
               clipPath: 'inset(10% 50% 90% 50% round 10px)',
            }}
         >
            {persons.map((person, index) => (
               <li
                  key={index}
                  className="flex justify-center items-center w-full px-4 py-2 gap-2 border border-purple-700 rounded-full"
               >
                  <img
                     src={person.imgUrl}
                     alt={person.name}
                     className="size-10 rounded-full"
                  />
                  <p className="w-full">{person.name}</p>
               </li>
            ))}
         </ul>
      </div>
   );
};

export default Menu;
