package utility;

import java.io.File;
import java.io.IOException;
import java.util.List;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import challenge.MessageModel;

/*
 * Codes Challenge For Edalex
 * @author Frank
 * @version 1.0 11/06/2020
 * 
 * Operate a JSON file including read and write.
 * Using jackson to map JSON file to JSON object.
 */
public class JsonFileUtility {
    private static String fileName = "./src/messages.json";

    /**
   * Read a JSON file
   * @return a MessageModel array which has been descending sorted.
   */
    public static MessageModel[] readJsonFile() {
        ObjectMapper objectMapper = new ObjectMapper();
        //read json file and convert to MessageModel object
        MessageModel[] mms=null;
        try {
            mms = objectMapper.readValue(new File(fileName), MessageModel[].class);
            if(mms.length!=0){
                mms=reverse(mms);
            }
        } catch (JsonParseException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (JsonMappingException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return mms;
        
    }

    /**
   * Write object to a JSON file
   * @param all messages which need to be stored into a JSON file.
   */

    public static void writeJsonFile(List<MessageModel> messages){
        ObjectMapper objectMapper = new ObjectMapper();
	        try {
	            objectMapper.writeValue(new File(fileName),messages);
	            //System.out.println(mms);
	        } catch (JsonParseException e) {
	            // TODO Auto-generated catch block
	            e.printStackTrace();
	        } catch (JsonMappingException e) {
	            // TODO Auto-generated catch block
	            e.printStackTrace();
	        } catch (IOException e) {
	            // TODO Auto-generated catch block
	            e.printStackTrace();
	        }
    }

    /**
   * Sorting a MessageModel array descending
   * @param all messages which need to be stored into a JSON file.
   * @return all messages
   */
    public static MessageModel[] reverse(MessageModel[] mms){
        for(int i=0;i<mms.length;i++)
        {
            for(int j=0;j<mms.length-i-1;j++)
            {
                if(mms[j].getId()<mms[j+1].getId())
                {
                	MessageModel temp=mms[j];
                    mms[j]=mms[j+1];
                    mms[j+1]=temp;
                }
            }
        }
		return mms;
    }

}