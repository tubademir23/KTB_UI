import {callAPIAddKayit, callAPIDeleteKayit, callAPIGetKayit, callAPIListe, callAPIUpdateKayit} from "./crud-utils";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {useEffect, useRef, useState} from "react";
import {Button} from "primereact/button";
import {Toast} from "primereact/toast";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {InputNumber} from "primereact/inputnumber";

export default function Crud() {
    const [eserler, setEserler] = useState(null);
    const [selectedEser, setSelectedEser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [eser, setEser] = useState(null);

    const toast = useRef(null);

    useEffect(() => {
        getEserler();
    }, []);

    function showBasarili() {
        console.log(toast);
        toast.current.show({severity: 'success', summary: 'Başarılı', detail: 'İşleminiz başarıyla tamamlandı..'});
    }

    async function getEserler() {
        setEserler(null);
        const res = await callAPIListe('eser');
        setEserler(res.data.data.Items);
    }

    async function editEser(rowData) {
        const res = await callAPIGetKayit('eser', rowData.id);
        setEser(res.data.data.Item);
        setShowModal(true);
    }

    async function confirmDeleteEser(rowData) {
        // eslint-disable-next-line no-restricted-globals
        const confirmed = confirm(`${rowData.id} ID'li kayıtı silmek istediğinize emin misiniz?`);
        if (confirmed) {
            await callAPIDeleteKayit('eser', rowData.id);
            showBasarili();
            getEserler();
        }
    }

    function actionBodyTemplate(rowData) {
        return (
            <>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editEser(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteEser(rowData)} />
            </>
        );
    }

    function handleModalCancel() {
        setShowModal(false);
        setEser(null);
    }

    async function handleModalSave() {
        if (eser.id) {
            await callAPIUpdateKayit('eser', eser);
        } else {
            await callAPIAddKayit('eser', eser);
        }
        setShowModal(false);
        setEser(null);
        showBasarili();
        getEserler();
    }

    const renderFooter = (name) => {
        return (
            <div>
                <Button label="İptal" icon="pi pi-times" onClick={handleModalCancel} className="p-button-text" />
                <Button label="Kaydet" icon="pi pi-check" onClick={handleModalSave} disabled={!eser?.adi} />
            </div>
        );
    }

    function handleEkleClick() {
        setEser({adi: ''});
        setShowModal(true);
    }

    const renderTableHeader = () => {
        return (
            <div className="table-header">
                <Button label="Ekle" icon="pi pi-check" onClick={handleEkleClick} />
            </div>
        );
    }

    function handleModalChange(field, value) {
        const newEser = {...eser};
        newEser[field] = value;
        setEser(newEser);
    }

    return (
      <>
          <Toast ref={toast} />
          <DataTable value={eserler} selectionMode="single" selection={selectedEser}
                     onSelectionChange={e => setSelectedEser(e.value)}
                     autoLayout stripedRows loading={eserler === null}
                     header={renderTableHeader()}
                     emptyMessage="Listelenecek kayıt yok.."
          >
              <Column field="id" header="ID"></Column>
              <Column field="adi" header="Adı"></Column>
              <Column field="yili" header="Yılı"></Column>
              <Column body={actionBodyTemplate}></Column>
          </DataTable>

          <Dialog header={eser?.id ? 'Eser Güncelle' : 'Eser Kayıt'} visible={showModal} style={{ width: '50vw' }} footer={renderFooter('displayBasic')} onHide={() => setShowModal(false)}>
              <div className="p-field">
                  <br />
                  <span className="p-float-label">
                    <InputText id="in" value={eser?.id} disabled />
                    <label htmlFor="in">ID</label>
                </span>
              </div>
              <br />
              <div className="p-field">
                  <span className="p-float-label">
                    <InputText id="in" value={eser?.adi} onChange={(e) => handleModalChange('adi', e.target.value)} />
                    <label htmlFor="in">Adı</label>
                  </span>
              </div>
              <br />
              <div className="p-field">
                  <span className="p-float-label">
                    <InputNumber id="in" value={eser?.yili} onChange={(e) => handleModalChange('yili', e.value)}
                                 useGrouping={false}
                    />
                    <label htmlFor="in">Eser Yılı</label>
                  </span>
              </div>
          </Dialog>

      </>
    );
}
