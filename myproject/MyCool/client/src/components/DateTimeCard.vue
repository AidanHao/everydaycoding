<template>
    <div class="DateTimeCard">
        <div class="DateTimeCard_time">
            <div class="time">{{ currentTime }}</div>
            <div class="date">{{ currentDate }}</div>
        </div>
        <div class="DateTimeCard_calendar">
            <div class="calendar-header">
                <span class="year">{{ currentYear }}</span>
                <span class="month">{{ currentMonth }}</span>
            </div>
            <div class="calendar-grid">
                <div v-for="day in calendarDays" :key="day" 
                     :class="['calendar-day', { 'today': isToday(day) }]">
                    {{ day }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const currentTime = ref('')
const currentDate = ref('')
const currentYear = ref('')
const currentMonth = ref('')
const calendarDays = ref<number[]>([])

const updateDateTime = () => {
    const now = new Date()
    currentTime.value = now.toLocaleTimeString('zh-CN', { hour12: false })
    currentDate.value = now.toLocaleDateString('zh-CN', { 
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    })
    currentYear.value = now.getFullYear().toString()
    currentMonth.value = (now.getMonth() + 1).toString() + '月'
    
    // 生成当月日历
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0)
    const days: number[] = []
    
    // 添加空白日期
    for (let i = 0; i < firstDay.getDay(); i++) {
        days.push(0)
    }
    
    // 添加当月日期
    for (let i = 1; i <= lastDay.getDate(); i++) {
        days.push(i)
    }
    
    calendarDays.value = days
}

const isToday = (day: number) => {
    const now = new Date()
    return day === now.getDate()
}

let timer: number

onMounted(() => {
    updateDateTime()
    timer = setInterval(updateDateTime, 1000)
})

onUnmounted(() => {
    clearInterval(timer)
})
</script>

<style lang="less" scoped>
.DateTimeCard {
    position: sticky;
    top: 5rem;
    width: 12rem;
    background: #ffffff;
    border-radius: 0.8rem;
    padding: 1.2rem;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
    margin-left: 1.5rem;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(14, 165, 233, 0.1);

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    }

    .DateTimeCard_time {
        text-align: center;
        margin-bottom: 1.2rem;
        padding-bottom: 1.2rem;
        border-bottom: 1px solid rgba(14, 165, 233, 0.15);

        .time {
            font-size: 2rem;
            font-weight: 600;
            color: #0369a1;
            margin-bottom: 0.4rem;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .date {
            font-size: 0.9rem;
            color: #64748b;
            font-weight: 500;
        }
    }

    .DateTimeCard_calendar {
        .calendar-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.8rem;
            font-size: 0.9rem;
            color: #0369a1;
            font-weight: 600;
        }

        .calendar-grid {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 0.3rem;

            .calendar-day {
                aspect-ratio: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.8rem;
                color: #64748b;
                border-radius: 0.3rem;
                transition: all 0.3s ease;
                font-weight: 500;

                &.today {
                    background: linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%);
                    color: #ffffff;
                    box-shadow: 0 2px 6px rgba(14, 165, 233, 0.3);
                }

                &:hover {
                    background: rgba(14, 165, 233, 0.1);
                    transform: scale(1.05);
                }
            }
        }
    }
}

@media screen and (max-width: 768px) {
    .DateTimeCard {
        position: relative;
        top: 0;
        width: 100%;
        margin: 1rem 0;
        padding: 1rem;

        .DateTimeCard_time {
            margin-bottom: 1rem;
            padding-bottom: 1rem;

            .time {
                font-size: 1.8rem;
            }

            .date {
                font-size: 0.85rem;
            }
        }

        .DateTimeCard_calendar {
            .calendar-header {
                font-size: 0.85rem;
            }

            .calendar-grid {
                gap: 0.2rem;

                .calendar-day {
                    font-size: 0.75rem;
                }
            }
        }
    }
}
</style> 