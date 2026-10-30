'use client';

import React, { useRef } from 'react';
import { Carousel, Button } from 'antd';
import { ChevronLeft, ChevronRight, Quote, Star, CheckCircle } from 'lucide-react';
import type { CarouselRef } from 'antd/es/carousel';
import { Testimonial } from '@/lib/types';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  const carouselRef = useRef<CarouselRef>(null);

  return (
    <section id="testimonials-section" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200/80">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold tracking-wide uppercase mb-3 shadow-xs">
            <CheckCircle size={14} className="text-emerald-600" />
            Verified Client Outcomes
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Trusted by Leaders,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
              Founders &amp; CTOs
            </span>
          </h2>
        </div>

        {/* Carousel Prev/Next Buttons */}
        <div className="flex items-center gap-2">
          <Button
            shape="circle"
            icon={<ChevronLeft size={18} />}
            onClick={() => carouselRef.current?.prev()}
            className="bg-white hover:bg-slate-50 text-slate-700 border-slate-200 h-11 w-11 flex items-center justify-center shadow-xs"
          />
          <Button
            shape="circle"
            icon={<ChevronRight size={18} />}
            onClick={() => carouselRef.current?.next()}
            className="bg-white hover:bg-slate-50 text-slate-700 border-slate-200 h-11 w-11 flex items-center justify-center shadow-xs"
          />
        </div>
      </div>

      <Carousel
        ref={carouselRef}
        autoplay
        autoplaySpeed={6000}
        dots={{ className: 'custom-carousel-dots' }}
      >
        {testimonials.map((test) => (
          <div key={test.id} className="pb-8">
            <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-sm">
              <Quote
                size={90}
                className="absolute -bottom-4 -right-4 text-slate-100 pointer-events-none"
              />

              <div className="flex items-center gap-1.5 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={
                      i < test.rating
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-slate-300'
                    }
                  />
                ))}
              </div>

              <blockquote className="text-lg sm:text-2xl font-medium text-slate-800 leading-relaxed mb-8 max-w-4xl">
                &ldquo;{test.content}&rdquo;
              </blockquote>

              <div className="flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={test.avatarUrl}
                  alt={test.clientName}
                  className="w-14 h-14 rounded-full object-cover border-2 border-emerald-500 shadow-sm"
                />
                <div>
                  <div className="text-base font-bold text-slate-900">
                    {test.clientName}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    {test.role} • <span className="text-emerald-700 font-bold">{test.company}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
};
