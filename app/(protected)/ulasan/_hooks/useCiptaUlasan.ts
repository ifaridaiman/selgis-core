import { useMapContext } from '@/components/map/MapContext';
import React,{useState} from 'react'
import { senaraiDaerahKodMukim, senaraiBahagian } from "@/contents/fieldInput";


export const useCiptaUlasan = () => {

    const {setCiptaUlasanForm, ciptaUlasanForm} = useMapContext();

    const [selectedDaerah, setSelectedDaerah] = useState("");
    const [filteredMukim, setFilteredMukim] = useState<{ kodMukim: string; namaMukim: string }[]>([]);
    const [selectedBahagian, setSelectedBahagian] = useState("");
    const [filteredJenisPermohonan, setFilteredJenisPermohonan] = useState<{ label: string; value: string }[]>([]);
    const [filteredStatus, setFilteredStatus] = useState<{ label: string; value: string }[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // State for selected files

    const handleChangeDaerah = (e: React.FormEvent<HTMLSelectElement>) => {
        const selected = (e.target as HTMLSelectElement).value;
        setSelectedDaerah(selected);
        setCiptaUlasanForm({ ...ciptaUlasanForm, daerah: selected });

        const daerahData = senaraiDaerahKodMukim.find(
            (daerah) => daerah.daerah === selected
        );

        setFilteredMukim(daerahData ? daerahData.senaraiMukim : []);
    };

    const handleChangeBahagian = (e: React.FormEvent<HTMLSelectElement>) => {
        const selected = (e.target as HTMLSelectElement).value;
        setSelectedBahagian(selected);
        setCiptaUlasanForm({ ...ciptaUlasanForm, bahagian: selected });

        const bahagianData = senaraiBahagian.find(
            (bahagian) => bahagian.value === selected
        );

        setFilteredJenisPermohonan(
            bahagianData ? bahagianData.senaraiJenisPermohonan : []
        );
        setFilteredStatus(bahagianData ? bahagianData.senaraiStatus : []);
    };

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        setCiptaUlasanForm({
            ...ciptaUlasanForm, // Spread the current state to retain other field values
            [name]: value, // Update only the specific field by its name
        });
    };
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          const filesArray = Array.from(e.target.files); // Convert FileList to Array
          setSelectedFiles(filesArray); // Store selected files
          setCiptaUlasanForm({ ...ciptaUlasanForm, folderPath: selectedFiles });
          handleInputChange(e); // Call handleInputChange if needed to update state in context
        }
      };
    
    return {selectedDaerah, filteredMukim, selectedBahagian, filteredJenisPermohonan, filteredStatus,handleChangeBahagian, handleChangeDaerah, handleInputChange, selectedFiles, handleFileChange}
}

