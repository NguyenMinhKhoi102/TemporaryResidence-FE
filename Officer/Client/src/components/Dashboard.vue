<template>
    <div class="dashboard">
        <div class="box-container mb-5">
            <div class="box" v-for="(e, i) in boxData" :style="{ backgroundColor: e.color1 }" :key="i">
                <div class="box-body">
                    <div class="box-icon">
                        <i :class="e.icon"></i>
                    </div>
                    <div class="box-content">
                        <div class="box-number">
                            {{ e.number }}
                        </div>
                        <div class="box-unit">
                            {{ e.unit }}
                        </div>
                    </div>
                </div>
                <div class="box-footer" :style="{ backgroundColor: e.color2 }">
                    {{ e.title }}
                </div>
            </div>
        </div>
        <div class="chart-container">
            <div class="chart-1">
                <canvas id="lineChart"></canvas>
            </div>
            <div class="chart-2">
                <canvas id="pieChart"></canvas>
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue';
import Chart from "chart.js/auto";
import 'vue3-toastify/dist/index.css';
export default defineComponent({
    components: {
        // Button,
    },
    setup(props, context) {
        const boxData = ref([
            {
                icon: "fa-solid fa-folder-closed",
                number: "10.000",
                unit: "Hồ sơ",
                title: "Tổng số hồ sơ tạm trú",
                color1: "#27a9e3",
                color2: "#208dbe",
            },
            {
                icon: "fa-regular fa-address-card",
                number: "10.000",
                unit: "Hồ sơ",
                title: "Số lượng hồ sơ đã xử lý",
                color1: "#28b779",
                color2: "#10a062",
            },
            {
                icon: "fa-regular fa-address-card",
                number: "10.000",
                unit: "Hồ sơ",
                title: "Số lượng hồ sơ chưa xử lý",
                color1: "#852b99",
                color2: "#6e1881",
            },
            {
                icon: "fa-solid fa-line-chart",
                number: "10.000",
                unit: "Hồ sơ",
                title: "Tỉ lệ tạm trú với cả nước",
                color1: "#ffb848",
                color2: "#cb871b",
            }
        ]);
        const chart1 = ref(null);
        const initChart = () => {
            const lineChartCanvas = document.getElementById('lineChart');
            const pieChartCanvas = document.getElementById('pieChart');
            chart1.value = new Chart(lineChartCanvas, {
                type: 'line',
                data: {
                    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
                    datasets: [
                        {
                            label: "Số tài khoản đã đăng ký",
                            backgroundColor: "#208dbe",
                            borderColor: "#208dbe",
                            data: [0, 20, 30, 57, 59],
                            tension: 0.2,
                        },
                        {
                            label: "Số hồ sơ đã duyệt",
                            backgroundColor: "#10a062",
                            borderColor: "#10a062",
                            data: [0, 10, 20, 23, 30],
                            tension: 0.2,
                        },
                        {
                            label: "Số hồ sơ chưa duyệt",
                            backgroundColor: "#6e1881",
                            borderColor: "#6e1881",
                            data: [0, 2, 6, 3, 2],
                            tension: 0.2,
                        },
                    ],
                },
                options: {
                    scales: {
                        x: {
                            beginAtZero: true,
                        },
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
            chart1.value = new Chart(pieChartCanvas, {
                type: "pie",
                data: {
                    labels: ["Đăng ký tạm trú", "Chưa đăng ký tạm trú"],
                    datasets: [
                        {
                            data: [78, 32],
                            backgroundColor: ["#ffb848", "rgba(128, 128, 128, 0.46)"],
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        labels: {
                            render: "percentage",
                            fontColor: ["green", "white"],
                            precision: 2,
                        },
                    },
                },
            });
        }
        onMounted(() => {
            try {
                initChart();
            } catch (error) {
                console.log(error);
            }
        })
        return {
            boxData,
        };
    }
});
</script>

<style>
.dashboard {
    .box-container {
        --column: 4;
        --spacing: 20px;
        margin-top: 50px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .box {
        width: calc(100% / var(--column) - var(--spacing));
        height: 120px;
        background-color: white;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        flex-direction: column;
        color: white;
    }

    .box-body {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-inline: 20px;
        font-size: 30px;
    }

    .box-content {
        text-align: right;
        line-height: 1.5;
        height: 70px;
    }

    .box-number {
        font-weight: 700;
    }

    .box-unit {
        font-size: 18px;
    }

    .box-footer {
        padding: 2px 20px;
    }

    .box-icon {
        font-size: 60px;
        height: 100%;
    }


    .chart-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
        gap: 0 30px;
    }

    .chart-1,
    .chart-2 {
        height: 400px;
    }

    .chart-1 {
        width: 65%;
    }

    .chart-2 {
        width: 35%;
    }
}
</style>