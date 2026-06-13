import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Utensils, BookOpen, Shirt, Droplet, Heart, Shield, GraduationCap } from 'lucide-react';
import AnimatedCounter from '../components/AnimatedCounter';

const Home = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Volunteers"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Empowering Lives. <br className="hidden md:block" />
            Inspiring <span className="text-secondary">Change.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-200 mb-10 max-w-3xl mx-auto"
          >
            NayePankh Foundation works towards education, youth empowerment, and community development to build a better and brighter tomorrow for all.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link to="/register" className="px-8 py-4 bg-secondary text-gray-900 font-bold rounded-md hover:bg-yellow-400 transition-colors inline-flex justify-center items-center">
              Become a Volunteer
            </Link>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-md hover:bg-white/10 transition-colors inline-flex justify-center items-center">
              Learn More
            </button>
          </motion.div>
        </div>
      </section>

      {/* Mission Cards Section */}
      <section className="py-16 bg-white relative z-30 -mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-secondary rounded-xl p-8 shadow-lg transform transition duration-300 hover:-translate-y-2 text-center"
          >
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-900">
              <Utensils size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Feed the Hungry</h3>
            <p className="text-gray-800 font-medium text-sm">
              We distribute nutritious food to people in need and also help stray animals.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ ...fadeInUp, visible: { ...fadeInUp.visible, transition: { delay: 0.2, duration: 0.6 } } }}
            className="bg-primary rounded-xl p-8 shadow-lg transform transition duration-300 hover:-translate-y-2 text-center text-white"
          >
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen size={32} />
            </div>
            <h3 className="text-xl font-bold mb-4">Educate to Empower</h3>
            <p className="text-white/90 font-medium text-sm">
              Supporting underprivileged children through education and learning resources.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ ...fadeInUp, visible: { ...fadeInUp.visible, transition: { delay: 0.4, duration: 0.6 } } }}
            className="bg-[#34495e] rounded-xl p-8 shadow-lg transform transition duration-300 hover:-translate-y-2 text-center text-white"
          >
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield size={32} />
            </div>
            <h3 className="text-xl font-bold mb-4">Dignity for Every Woman</h3>
            <p className="text-white/90 font-medium text-sm">
              Providing awareness and sanitary napkins to promote hygiene and dignity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How It Started */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVscGluZyUyMGhhbmR8ZW58MHx8MHx8fDA%3D" alt="Volunteers working" className="rounded-2xl shadow-md w-full h-48 object-cover" />
                <img src="https://images.unsplash.com/photo-1529390079861-591de354faf5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Children studying" className="rounded-2xl shadow-md w-full h-48 object-cover mt-8" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h4 className="text-primary font-bold text-sm tracking-wider uppercase mb-2">Our Story</h4>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">How It Started?</h2>
              <div className="space-y-4 text-gray-600 font-medium">
                <p>2020 was a year when the world was struggling through the COVID-19 pandemic.</p>
                <p>During those difficult times, a group of high school students came together to help underprivileged communities using whatever resources they could arrange.</p>
                <p>They started conducting relief efforts, food distribution drives, and community support activities.</p>
                <div className="flex items-start gap-4 mt-6 p-4 bg-primary/5 rounded-xl border border-primary/10">
                  <div className="text-primary mt-1">
                    <Heart size={24} />
                  </div>
                  <p className="text-primary font-semibold">
                    On 28 March 2021, NayePankh Foundation officially began its journey to serve society and empower communities through youth-led initiatives.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What is NayePankh */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center flex-row-reverse">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2 relative"
            >
              <img src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="NayePankh Impact" className="rounded-2xl shadow-xl" />
              <div className="absolute -bottom-6 -left-6 bg-secondary text-gray-900 p-6 rounded-2xl shadow-xl max-w-[200px]">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-3">
                  <Shield size={24} className="text-primary" />
                </div>
                <p className="font-bold text-lg">12A & 80G</p>
                <p className="text-sm font-medium">Certified NGO</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <h4 className="text-primary font-bold text-sm tracking-wider uppercase mb-2">About Us</h4>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">What is NayePankh?</h2>
              <p className="text-gray-600 font-medium mb-6">
                NayePankh Foundation is a registered NGO committed to bringing change and helping people during difficult times. We aim to uplift the underprivileged sections of our society.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Food Distribution',
                  'Education Support',
                  'Women Hygiene Awareness',
                  'Clothing Distribution',
                  'Community Welfare'
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-700 font-medium">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/about" className="text-primary font-bold hover:underline inline-flex items-center gap-2">
                Learn more about our journey &rarr;
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-200">
            <AnimatedCounter value="200000" label="People Helped" icon={Users} />
            <AnimatedCounter value="150" label="Food Distribution Drives" icon={Utensils} />
            <AnimatedCounter value="5000" label="Sanitary Napkins Distributed" icon={Droplet} />
            <AnimatedCounter value="2500" label="Children Supported" icon={GraduationCap} />
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h4 className="text-primary font-bold text-sm tracking-wider uppercase mb-2">Our Programs</h4>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Be a Part of the Change</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Education Support', icon: BookOpen, desc: 'Distributing study materials to children.' },
              { title: 'Skill Development', icon: Users, desc: 'Empowering youth with employable skills.' },
              { title: 'Health & Hygiene', icon: Heart, desc: 'Free health check-ups and awareness.' },
              { title: 'Women Empowerment', icon: Shield, desc: 'Promoting dignity and self-reliance.' }
            ].map((prog, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <prog.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">{prog.title}</h3>
                <p className="text-gray-600 text-sm font-medium">{prog.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer CTA */}
      <section className="relative py-24 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-primary-gradient opacity-90 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-30 mix-blend-overlay" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight"
          >
            Be the reason for someone's smile.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 mb-10 font-medium"
          >
            Join hands with us and become a part of meaningful change.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/register" className="px-10 py-5 bg-white text-primary font-bold rounded-full shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-300 inline-block text-lg">
              Register as Volunteer
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
