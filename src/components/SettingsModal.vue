<template>
  <div class="max-w-2xl p-4 mx-auto">
    <div
      id="drawer-example"
      class="dct-drawer dct-drawer-fixed z-40 h-screen p-0 overflow-y-auto bg-slate-50 w-[57%] dct-modal hidden"
      tabindex="-1"
      aria-labelledby="drawer-label"
      style="background: #fff"
    >
      <button
        @click="closeModal"
        id="drawer-hide-button"
        type="button"
        aria-controls="drawer-example"
        class="dct-button z-20 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <svg
          aria-hidden="true"
          class="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span class="sr-only">Close menu</span>
      </button>
      <div class="flex items-start">
        <div
          class="dct-drawer-main-section w-full h-fit bg-[#fff] z-10"
          :style="calendarSettingsStore.loader ? 'overflow:hidden' : ''"
        >
          <div v-if="!openTab" class="grid grid-cols-1 gap-4 w-full h-full">
            <div
              class="w-full border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"
            >
              <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                Настройки статуса
              </h2>
              <MultilevelSelect
                popover="Необходимо выбрать этап amoCRM. При переходе сделки на данный этап, будет создано событие в Google Календарь"
                label="Статус"
                name="settings_status_id"
                :settings="{
                  selected: {
                    parent_id: settings.pipeline_id,
                    child_id: settings.status_id,
                  },
                  options: statuses,
                  option: {
                    key: 'id',
                    value: 'name',
                    nested: 'options',
                  },
                  nested: {
                    key: 'id',
                    value: 'name',
                  },
                }"
                @update:value="handleStatus"
              />
            </div>
          </div>
          <div
            v-if="openTab"
            class="w-full h-screen ml-0"
            style="margin-left: 0px !important; background: #ffffff !important"
          ></div>
        </div>
      </div>
      <div
        class="flex justify-start sticky bottom-0 bg-white px-[20px] py-[13px] w-full z-20 gap-2"
        style="box-shadow: rgba(22, 36, 61, 0.14) 3px 12px 32px"
      >
        <button
          @click="handleSave"
          type="button"
          class="dct-button text-white bg-[#2a7cef] hover:bg-[#5c8bf9] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[#2a7cef] dark:hover:bg-[#2a7cef] dark:focus:ring-blue-800"
          :class="calendarSettingsStore.loader ? 'pointer-events-none' : ''"
        >
          Сохранить
        </button>
        <button
          @click="closeModal"
          type="button"
          class="text-gray-500 border-solid bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:focus:ring-gray-600"
        >
          Закрыть
        </button>
      </div>
      <div
        v-if="calendarSettingsStore.loader"
        class="absolute w-full h-full top-0 left-0 bg-[#f5f5f5f5] flex justify-center items-center pointer-events-none"
        style="z-index: 99999999999999999"
      >
        <div role="status">
          <svg
            aria-hidden="true"
            class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-[#2a7cef]"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MultilevelSelect from "./inputs/MultilevelSelect.vue";
import { useSettingsStore } from "../stores/settings";
import { useSelectStore } from "../stores/select";
import { onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useCalendarSettingsStore } from "../stores/calendar_settings";
import { notify } from "@kyvg/vue3-notification";

const settingsStore = useSettingsStore();
const selectStore = useSelectStore();

const { settings } = storeToRefs(settingsStore);
const { statuses, selects } = storeToRefs(selectStore);
const calendarSettingsStore = useCalendarSettingsStore();

const props = defineProps({
  account: [Number, null],
  subdomainId: Number,
});

const emit = defineEmits(["close-drawer"]);
// logic
const useInput = ref(false);
const usePcker = ref(true);

const isOpenTemplate = ref(false);
const canAddNewItem = ref(true);
const services = ref(null);
const openTab = ref(false);

function changeTab1() {
  openTab.value = false;
}

function changeTab2() {
  openTab.value = true;
}

function toggleTemplate() {
  isOpenTemplate.value = !isOpenTemplate.value;
}

function copyMarker(id) {
  settings.value.event_body =
    settings.value.event_body === null
      ? ""
      : settings.value.event_body + " " + id;
}

function handleAddress(value) {
  settings.value.event_address_id = value;
}

function handleTaskName(value) {
  settings.value.event_name_id = value;
}

function handleStartDate(value) {
  settings.value.start_date_id = value;
}

function handleEndDate(value) {
  settings.value.end_date_id = value;
}

function handleServiceParentId(parentId) {
  settings.value.services_parent_id = parentId;
  services.value = getServices(parentId);
  settings.value.services = [{}];
}

function getServices(parentId) {
  console.log(selects.value);
  return selects.value
    .find((select) => select.id === parentId)
    .options.map((option) => {
      return {
        service_id: option.id,
        service_value: option.value,
      };
    });
}

function handleService(serviceId, index) {
  const service = services.value.find((item) => item.service_id === serviceId);
  settings.value.services[index].service_id = service.service_id;
  settings.value.services[index].service_value = service.service_value;
  settings.value.services[index].order = index;
  //   servicesToDeleteFromSelect.value.push(serviceId);
  //   services.value = services.value.filter((service) => service.id !== serviceId);
}

function handleCalendar(calendar_id, index) {
  settings.value.services[index].calendar_id = calendar_id;
}

function handleStatus(option) {
  settings.value.pipeline_id = option.parent;
  settings.value.status_id = option.child;
}

async function handleSave() {
  try {
    calendarSettingsStore.loader = true;
    await settingsStore.saveSettings(props.account);
    await calendarSettingsStore.saveCalendar(props.account);
  } catch (error) {
    calendarSettingsStore.loader = false;
    notify({
      type: "error",
      title: "Пользователь #" + props.account,
      text: "Заполните все поля или попробуйте авторизоваться еще раз",
    });
  }
}

function addService() {
  settings.value.services.push({});
  checkCanAddNewItem();
}

function checkCanAddNewItem() {
  if (services.value.length <= settings.value.services.length) {
    canAddNewItem.value = false;
  } else {
    canAddNewItem.value = true;
  }
}

async function deleteItem(index, id) {
  settings.value.services.splice(index, 1);
  //   servicesToDeleteFromSelect.value = servicesToDeleteFromSelect.value.filter(
  //     (s) => s !== id
  //   );
  checkCanAddNewItem();
}

function closeModal() {
  document.getElementById("drawer-example").classList.add("hidden");
  emit("close-drawer");
}

watch(useInput, (newValue) => {
  settings.value.start_date_id = null;
  settings.value.end_date_id = null;
  usePcker.value = !newValue;
});

watch(usePcker, (newValue) => {
  settings.value.date_district_start = null;
  settings.value.date_district_end = null;

  settings.value.start_date_id = null;
  useInput.value = !newValue;
});

onMounted(async () => {
  document.getElementById("drawer-example").classList.remove("hidden");
  console.log(
    settings.value.services_parent_id,
    settingsStore.settings.google_account_id
  );
  services.value = [];
  if (settings.value.services_parent_id) {
    services.value = getServices(settings.value.services_parent_id);
  }
  await calendarSettingsStore.getCalendars(
    settingsStore.settings.google_account_id
  );
});
</script>
