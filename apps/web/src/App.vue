<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { getHealth, getSummary, SummaryResponse, type HealthResponse } from './services/api'

const health = ref<HealthResponse | null>(null)
const summary = ref<SummaryResponse | null>(null)
const error = ref<string | null>(null)
const isLoading = ref(false)

const formattedTimestamp = computed(() => {
  if (!health.value?.date) return '-'

  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'medium',
  }).format(new Date(health.value.date))
})

async function loadHealth() {
  isLoading.value = true
  error.value = null

  try {
    health.value = await getHealth()
  } catch {
    health.value = null
    error.value = 'API indisponivel'
  } finally {
    isLoading.value = false
  }
}

async function summaryApi() {
  try {
    const response = (summary.value = await getSummary())
    console.log(response)
  } catch (error) {
    console.error(error)
  }
}

console.log('summary:', summary)

onMounted(loadHealth)
onMounted(summaryApi)
</script>

<template>
  <main class="shell">
    <header class="topbar">
      <div>
        <p class="eyebrow">Laboratorio full-stack</p>
        <h1>Data Import Manager</h1>
      </div>

      <button class="refresh-button" type="button" :disabled="isLoading" @click="loadHealth">
        {{ isLoading ? 'Consultando' : 'Atualizar' }}
      </button>
    </header>

    <section class="status-panel" aria-label="Status da API">
      <div class="status-row">
        <span class="status-dot" :class="{ online: health?.status === 'ok' }"></span>
        <div>
          <p class="label">API</p>
          <strong>{{ health?.status ?? error ?? 'Sem resposta' }}</strong>
        </div>
      </div>

      <dl class="metrics-grid">
        <div>
          <dt>Ambiente</dt>
          <dd>{{ health?.environment ?? '-' }}</dd>
        </div>
        <div>
          <dt>Ultima leitura</dt>
          <dd>{{ formattedTimestamp }}</dd>
        </div>
      </dl>
    </section>

    <section class="status-panel" aria-label="Status da API">
      <div class="status-row">
        <span class="status-dot" :class="{ online: health?.status === 'ok' }"></span>
        <div>
          <p class="label">Resposta Summary</p>
          <strong>{{ summary?.totalImports ?? error ?? 'Sem resposta' }}</strong>
        </div>
        <button @click="summaryApi">Chamar API</button>
      </div>
    </section>
  </main>
</template>
