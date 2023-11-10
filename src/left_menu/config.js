import { mountComponent } from "../helpers/mounter";
import RightModal from "../render/RightModal.vue";

/**
 * Метод срабатывает, когда пользователь переходит на кастомную страницу виджета.
 * Мы должны отрендерить страницу в зависимости от состоянии страницы.
 *
 * @param _amocrm
 * @param params - Передается текущее состояние страницы. Формат такой:
 * {
 *     location: 'widget-page', // текущая локация
 *     item_code: 'custom_item_1', // ключ, который был указан в manifest.json
 *     subitem_code: 'custom_sub_item_3' // ключ подпункта, который был указан в manifest.json
 * }
 * @param self
 * @param $
 */
export async function handleLeftMenu(_amocrm, params, self, $) {
    console.log(params)
    if (params.location === 'widget_page') {
        $('#work-area-dct_google_calendar').closest('#work_area').addClass('bg-white')
        console.log($('#work-area-dct_google_calendar'), 1)
        //
    }
}