<template>
  <b-container>
    <b-table :items="items" :fields="fields">
      <template slot="actions" slot-scope="row">
        <b-button size="sm" @click="info(result[row.index], row.index, $event.target)" class="mr-1">
          Info modal
        </b-button>
        <b-button size="sm" @click="row.toggleDetails">
          {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
        </b-button>
      </template>

      <template slot="row-details" slot-scope="row">
        <b-card>
          <b-list-group>
            <b-list-group-item class="d-flex" v-for="(value,key,index) in result[row.index]" :key="index" >
              {{key}} - {{value}}
            </b-list-group-item>
          </b-list-group>
          <b-button size="sm" @click="row.toggleDetails">Hide Details</b-button>
        </b-card>
      </template>
    </b-table>

    <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      {{infoModal.content.text}}
    </b-modal>
  </b-container>
</template>

<script>
export default {
  async fetch({store}) {
    if (store.getters.result.length === 0) {
      await store.dispatch('fetch')
    }
  },
  data: () => ({
    fields: ['id', 'title', 'startup', 'speed', 'actions'],
    infoModal: {
      id: 'info-modal',
      title: '',
      content: ''
    }
  }),
  computed: {
    result() {
      return this.$store.getters.result
    },
    myInfo() {
      return this.$store.getters.info
    },
    items() {
      let items = []

      this.result && this.result.map(el => {
        items.push({
          id: el.id,
          title: el.title,
          startup: el.startup,
          speed: el.speed
        })
      })

      return items
    }
  },
  methods: {
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = this.myInfo.find(el => el.id === item.id)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    }
  }
}
</script>
