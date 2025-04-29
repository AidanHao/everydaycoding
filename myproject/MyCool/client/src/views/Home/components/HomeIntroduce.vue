<template>
    <div class="Introduce">
        <div class="Introduce_content">
            <div v-for="(data, index) in datas" :key="index">
                <TextCard 
                    :id="String(index + 1)"
                    :title="data.title" 
                    :content="data.content" 
                    :cover="data.cover" 
                    :left="index % 2 === 0"
                    :author="data.author"
                    :releaseDate="data.releaseDate"
                    :thumbsUp="data.thumbsUp"
                    :collection="data.collection"
                    :hasCover="data.hasCover"
                ></TextCard>
            </div>
        </div>
        <DateTimeCard />
    </div>
</template>

<script setup lang="ts">
    import TextCard from '@/components/TextCard.vue';
    import DateTimeCard from '@/components/DateTimeCard.vue';
    import { reactive } from 'vue';

    const datas = reactive([
        {
            title: 'vue的响应式原理',
            cover: '../../public/demo/人物.png',
            content: '第三章：响应式系统的实现原理3.1 数据劫持数据劫持是响应式系统的核心机制之一，它通过拦截对象属性的读取和设置操作，实现对数据的监控。在Vue 2中，数据劫持主要通过Object.defineProperty实现，而在Vue 3中，则使用Proxy对象来实现更强大的数据劫持功能。Proxy可以监听对象的任何属性变化，包括新增和删除属性，而Object.defineProperty只能监听已存在的属性。3.2 依赖收集依赖收集是指在数据被读取时，记录哪些组件或代码依赖于该数据。这样，当数据变化时，可以精确地通知到依赖它的组件或代码。Vue使用Watcher对象来收集依赖。当组件渲染时，会创建一个Watcher实例，该实例会读取响应式数据，从而触发数据的getter，进而将Watcher添加到依赖列表中。3.3 派发更新派发更新是指在数据变化时，通知所有依赖该数据的Watcher进行更新。在Vue中，当数据被修改时，会触发setter，进而触发依赖列表中的所有Watcher的更新函数，使得依赖该数据的组件重新渲染。Vue 3通过引入effect函数和scheduler调度器，优化了派发更新的过程，可以更细粒度地控制更新时机，减少不必要的渲染。',
            author: '前端小王子',
            thumbsUp: 128,
            collection: 56,
            releaseDate: '2024.11.30',
            hasCover: true
        },
        {
            title: 'js的事件循环',
            cover: '../../public/demo/人物2.jpg',
            content: 'JavaScript 的事件循环是一种执行模型，它允许 JavaScript 引擎在执行代码时处理异步事件。事件循环是 JavaScript 并发模型的核心，特别是在处理 I/O 操作时。了解事件循环对于理解 JavaScript 的异步行为和性能优化至关重要。',
            author: 'JavaScript大师',
            thumbsUp: 89,
            collection: 34,
            releaseDate: '2024.11.30',
            hasCover: true
        },
        {
            title: '什么是promise',
            cover: '../../public/demo/人物3.jpg',
            content: 'Promise 是现代 JavaScript 中异步编程的基础，是一个由异步函数返回的可以向我们指示当前操作所处的状态的对象。 在 Promise 返回给调用者的时候，操作往往还没有完成，但 Promise 对象可以让我们操作最终完成时对其进行处理（无论成功还是失败）12。Promise有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。 一旦Promise的状态发生改变，就不会再变2。',
            author: '异步编程专家',
            thumbsUp: 156,
            collection: 78,
            releaseDate: '2024.11.30',
            hasCover: true
        },
        {
            title: '前端工程化实践',
            content: '前端工程化是现代前端开发中不可或缺的一部分，它涵盖了从项目初始化、开发、构建、测试到部署的整个生命周期。通过工程化实践，我们可以提高开发效率，保证代码质量，优化性能，并实现更好的团队协作。本文将介绍一些常见的前端工程化实践，包括但不限于：模块化开发、自动化构建、代码规范、性能优化、持续集成等。',
            author: '工程化专家',
            thumbsUp: 145,
            collection: 62,
            releaseDate: '2024.12.01',
            hasCover: false
        },
        {
            title: 'TypeScript 类型系统详解',
            content: 'TypeScript 的类型系统是其最强大的特性之一，它提供了静态类型检查，可以在编译时发现潜在的错误。本文将深入探讨 TypeScript 的类型系统，包括基础类型、联合类型、交叉类型、泛型、类型推断、类型守卫等概念。通过理解这些概念，我们可以编写更加健壮和可维护的代码。',
            author: 'TypeScript 专家',
            thumbsUp: 178,
            collection: 83,
            releaseDate: '2024.12.02',
            hasCover: false
        },
        {
            title: 'Web 安全最佳实践',
            content: 'Web 安全是每个开发者都需要关注的重要话题。本文将介绍一些常见的 Web 安全威胁和防护措施，包括 XSS、CSRF、SQL 注入等攻击方式，以及如何通过输入验证、输出编码、使用安全的 API 等方式来防范这些威胁。同时，我们也会讨论一些安全相关的 HTTP 头部设置和最佳实践。',
            author: '安全专家',
            thumbsUp: 167,
            collection: 75,
            releaseDate: '2024.12.03',
            hasCover: false
        },
        {
            title: '介绍一下性能优化',
            cover: '../../public/demo/人物4.jpg',
            content: '性能优化的目的，就是为了提供给用户更好的体验，这些体验包含这几个方面：展示更快、交互响应快、页面无卡顿情况。 更详细的说，就是指，在用户输入url到站点完整把整个页面展示出来的过程中，通过各种优化策略和方法，让页面加载更快；在用户使用过程中，让用户的操作响应更及时，有更好的用户体验。 对于前端工程师来说，要做好性能优化，需要理解浏览器加载和渲染的本质。 理解了本质原理，才能更好的去做优化。',
            author: '性能优化达人',
            thumbsUp: 203,
            collection: 92,
            releaseDate: '2024.11.30'
        },
        {
            title: '聊一聊浏览器缓存',
            cover: '../../public/demo/太空.png',
            content: 'web缓存主要指的是两部分：浏览器缓存和http缓存。其中http缓存是web缓存的核心，是最难懂的那一部分,也是最重要的那一部分。浏览器缓存：比如,localStorage,sessionStorage,cookie等等。这些功能主要用于缓存一些必要的数据，比如用户信息。比如需要携带到后端的参数。亦或者是一些列表数据等等。不过这里需要注意。像localStorage，sessionStorage这种用户缓存数据的功能，他只能保存5M左右的数据，多了不行。cookie则更少，大概只能有4kb的数据。不要担心，这些概念对于未来会称为前端大牛的你来说都不是什么问题，非常的简单。因为太简单，数据缓存不再这篇文章的介绍中，这里一笔带过',
            author: '缓存专家',
            thumbsUp: 167,
            collection: 45,
            releaseDate: '2024.11.30'
        },
        {
            title: '从输入url到页面渲染',
            cover: '../../public/demo/打工人.png',
            content: '浏览器根据请求的 URL 交给 DNS 域名解析，找到真实 IP ，向服务器发起请求；服务器交给后台处理完成后返回数据，浏览器接收⽂件（ HTML、JS、CSS 、图象等）；浏览器对加载到的资源（ HTML、JS、CSS 等）进⾏语法解析，建立相应的内部数据结构 （如 HTML 的 DOM）；载⼊解析到的资源⽂件，渲染页面，完成。',
            author: '浏览器专家',
            thumbsUp: 189,
            collection: 67,
            releaseDate: '2024.11.30'
        },
    ])
</script>

<style lang="less" scoped>
    .Introduce {
        padding: 1.5rem;
        width: 95%;
        height: fit-content;
        margin: 1.5rem auto;
        border-radius: 0.8rem;
        background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        box-shadow: 0 0 1.5rem rgba(14, 165, 233, 0.05);
        transition: all 0.3s ease;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;

        &:hover {
            box-shadow: 0 0 2rem rgba(14, 165, 233, 0.08);
        }

        .Introduce_content {
            flex: 1;
            margin-right: 1.5rem;

            > div {
                margin-bottom: 2rem;
                &:last-child {
                    margin-bottom: 0;
                }
            }
        }
    }

    @media screen and (max-width: 768px) {
        .Introduce {
            padding: 1rem;
            width: 98%;
            margin: 1rem auto;

            .Introduce_content {
                margin-right: 1rem;

                > div {
                    margin-bottom: 1.5rem;
                }
            }
        }
    }
</style>